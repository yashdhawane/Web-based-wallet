import { useState } from "react"
import { mnemonicToSeed } from "bip39"
import { Wallet, HDNodeWallet } from "ethers"

export function EthWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [wallets, setWallets] = useState([]);

  return (
    <div>
      <h2>Ethereum Wallet</h2>
      <button onClick={async function() {
        const seed = await mnemonicToSeed(mnemonic)
        const derivationPath = `m/44'/60'/${currentIndex}'/0/0`
        const hdNode = HDNodeWallet.fromSeed(seed)
        const child = hdNode.derivePath(derivationPath)
        const privateKey = child.privateKey
        const wallet = new Wallet(privateKey)
        setCurrentIndex(currentIndex + 1)
        setWallets([...wallets, { address: wallet.address, privateKey }]);


      }}>
        Add ETH Wallet
      </button>
      {wallets.map((wallet, index) => (
        <div key={index}>
          <div>Ethereum Address: {wallet.address}</div>
          <div>Ethereum Private Key: {wallet.privateKey}</div>
        </div>
      ))}
    </div>
  )
}