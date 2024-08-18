import { useState } from "react";
import CustomButton from "./CutomButton";

export default function SendSol({ wallet }) {
    const [receiverAddress, setReceiverAddress] = useState("");
    const [amount, setAmount] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(receiverAddress)
        // console.log(amount)
        // console.log(wallet.privateKey)
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