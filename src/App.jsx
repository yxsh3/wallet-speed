import { useEffect, useState } from "react"
import MnemonicBox from "./components/MnemonicBox"
import Navbar from "./components/Navbar"
import TopBar from "./components/TopBar"
import WalletBox from "./components/WalletBox"


function App() {
  const [walletSeed, setWalletSeed] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [showWallet, setShowWallet] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('wallet');
    if(!data) return;
    const wallet = JSON.parse(data);
    setWallets(wallet.wallets)
    setWalletSeed({
      mnemonic: wallet.mnemonic,
      seed: wallet.seed
    })
  }, [])

  useEffect(() => {
    if(walletSeed){
      localStorage.setItem(
        "wallet",
        JSON.stringify({
          mnemonic: walletSeed?.mnemonic,
          seed: walletSeed?.seed,
          wallets: wallets
        })
      )
    }
  }, [walletSeed, wallets])

  return (
    <div>
      <TopBar></TopBar>
      <div className="px-9">
        <MnemonicBox walletSeed={walletSeed} setWalletSeed={setWalletSeed} setWallets={setWallets} setShowWallet={setShowWallet}></MnemonicBox>
        <hr />
        <Navbar walletSeed={walletSeed} wallets={wallets} setWallets={setWallets} setShowWallet={setShowWallet}></Navbar>
        <hr />
        <WalletBox showWallet={showWallet}></WalletBox>
      </div> 
    </div>
  )
}

export default App
