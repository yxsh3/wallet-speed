import { useEffect, useState } from "react"
import MnemonicBox from "./components/MnemonicBox"
import Navbar from "./components/Navbar"
import TopBar from "./components/TopBar"
import WalletBox from "./components/WalletBox"
import Footer from "./components/Footer"

function App() {
  const [walletSeed, setWalletSeed] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [showWallet, setShowWallet] = useState(false);
  const [netConnect, setNetConnect] = useState("devnet");

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
      <TopBar setNetConnect={setNetConnect}></TopBar>
      <div className="px-9">
        <MnemonicBox walletSeed={walletSeed} setWalletSeed={setWalletSeed} setWallets={setWallets} setShowWallet={setShowWallet}></MnemonicBox>
        <hr />
        <Navbar netConnect={netConnect} walletSeed={walletSeed} setWalletSeed={setWalletSeed} wallets={wallets} setWallets={setWallets} showWallet={showWallet} setShowWallet={setShowWallet}></Navbar>
      </div> 
      <hr />
      <Footer></Footer>
    </div>
  )
}

export default App
