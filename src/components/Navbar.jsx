import nacl from "tweetnacl";
import CustomButton from "./CutomButton";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { toast } from "sonner";
import { useState } from "react";
import WalletBox from "./WalletBox";


export default function Navbar( {walletSeed, wallets, setWallets, setShowWallet} ) {

    const createWallet = () => {
        if(!walletSeed) return;
        const path = `m/44'/501'/${wallets.length}'/0'`;
        const derivedSeed = derivePath(path, walletSeed?.seed.toString("hex")).key;
        const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const publicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58();

        setWallets((prevWallets) => {
            return [...prevWallets, {
                publicKey: publicKey,
                privateKey: bs58.encode(secretKey)
            }]
        })
        console.log(wallets);
        toast.success('New Wallet is added')
    }

    const openWallet = () => {
        setShowWallet(true);
    }

    return (
        <div className="flex-col mb-4">
            <h3 className="text-xl text-purple-900">Your Wallets</h3>
            <div className="flex justify-between mt-2">
                <div className="flex gap-2 flex-nowrap">
                    {wallets.map((_, index) => {
                        return <div onClick={openWallet} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 cursor-pointer" key={index}>
                            {index+1}
                        </div>
                    })}
                    <div className="cursor-pointer" onClick={createWallet}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </div>
                </div>
                <CustomButton text="Clear Wallets" onClick={() => {
                    setWallets([])
                    setShowWallet(false)
                }}></CustomButton>
            </div>
        </div>
    )
}