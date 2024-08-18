import { useEffect, useState } from "react";
import CustomButton from "./CutomButton";
import { toast } from "sonner";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from "bs58";

export default function SendSol({ wallet, netConnect, balance, setBalance }) {
    const [receiverAddress, setReceiverAddress] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        setReceiverAddress("");
        setAmount("")
    }, [wallet])

    // Working on this Not yet Implemented There is a BUG
    const getBalance = async (wallet) => {
        try {
            const apiKey = import.meta.env.VITE_SOLANA_API_KEY;
            const response = await axios.post(`https://solana-${netConnect}.g.alchemy.com/v2/${apiKey}`, {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getBalance",
                "params": [wallet.publicKey]
            }, {
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            setBalance(response.data.result.value)
        } catch (error) {
            toast.error('Request Failed to Get Balance')
        }
    };

    const sendTransaction = async () => {
        try {
            if(!receiverAddress || !amount || !wallet) return toast.error("All fields are required");
            const apiKey = import.meta.env.VITE_SOLANA_API_KEY;
            const connection = new Connection(`https://solana-${netConnect}.g.alchemy.com/v2/${apiKey}`, "confirmed");
            const keypair = Keypair.fromSecretKey(bs58.decode(wallet.privateKey));
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: keypair.publicKey,
                    toPubkey: new PublicKey(receiverAddress),
                    lamports: LAMPORTS_PER_SOL * amount,
                })
            );

            const signature = await sendAndConfirmTransaction(
                connection,
                transaction,
                [keypair]
            );
            // Update the Total Balance and then setBalance (Not working yet) 
            getBalance(wallet);
            toast.success("Transaction success");
        } catch (error) {
            console.log(error.Message)
            toast.error("Something went wrong")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(receiverAddress)
        // console.log(amount)
        // console.log(wallet.privateKey)
        sendTransaction();
        setReceiverAddress("")
        setAmount("")
    }

    return (
        <div className="my-6">
            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-10 md:grid-cols-3 items-end">
                    <div>
                        <label htmlFor="receiver_address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wallet Addres</label>
                        <input
                            type="text"
                            id="receiver_address"
                            name="receiver_address"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Receiver Wallet"
                            required
                            autoComplete="off"
                            value={receiverAddress}
                            onChange={(e) => {
                                setReceiverAddress(e.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                        <input
                            type="text"
                            inputMode="decimal"
                            id="amount"
                            name="amount"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Amount in SOL"
                            value={amount}
                            required
                            autoComplete="off"
                            pattern="[0-9]*[.,]?[0-9]*"
                            onChange={(e) => {
                                setAmount(e.target.value)
                            }}
                        />
                    </div>
                    <div className="flex justify-center">
                        <CustomButton type="submit" text="Send SOL"></CustomButton>
                    </div>
                </div>
            </form>

        </div>
    )
}