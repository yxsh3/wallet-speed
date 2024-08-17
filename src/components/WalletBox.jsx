import { useState } from "react";
import CustomButton from "./CutomButton";
import DialogBox from "./DialogBox";
import { toast } from "sonner";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function WalletBox({ balance, wallet, showWallet, setShowWallet, wallets, setWallets }) {

    return (
        <div className="mt-2 flex-col">
            {!showWallet && <div className="flex items-center justify-center mt-10 mb-24">
                <h2 className="text-gray-500 text-2xl">
                    {wallets.length < 1 ? "Add a Wallet from Your Wallets" : "Select a Wallet"}
                </h2>
            </div>}
            {showWallet && <div>
                <div className="flex-col my-4">
                    <div className="flex justify-between">
                        <h1 className="text-5xl text-slate-950">Wallet {wallet.index + 1}</h1>
                        <DialogBox wallet={wallet} setShowWallet={setShowWallet} wallets={wallets} setWallets={setWallets} ></DialogBox>
                    </div>
                    <div className="flex gap-2 py-2 text-neutral-500">
                        <p>{wallet.publicKey}</p>
                        <div className="cursor-pointer" onClick={(e) => {
                            try {
                                navigator.clipboard.writeText(wallet.publicKey);
                                toast.success("Copied");
                            } catch (error) {
                                toast.error("failed to copy");
                            }
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex-col">
                    <h3 className="text-neutral-600 font-semibold">Total Balance</h3>
                    <h1 className="text-4xl text-slate-950">{balance/LAMPORTS_PER_SOL} SOL</h1>
                </div>

                <div className="flex items-center justify-center m-10">
                    <CustomButton text="Send SOL"></CustomButton>
                </div>
            </div>}
        </div>
    )
}