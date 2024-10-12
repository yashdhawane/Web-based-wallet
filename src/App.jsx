import { useState } from 'react'
import { generateMnemonic } from "bip39"
import './App.css'
import { SolanaWallet } from './components/SolonaWallet'
import { EthWallet } from './components/EthWallet'

function App() {
  const [mnemonic, setMnemonic] = useState("")

  return (
    <>
       <h1>Web-based Wallet</h1>
      <button onClick={async function() {
        const mn = await generateMnemonic()
        setMnemonic(mn)
      }}>
        Create Seed Phrase
      </button>
      <input type="text" value={mnemonic} readOnly></input>
      
      {mnemonic && (
        <>
          <SolanaWallet mnemonic={mnemonic} />
          <EthWallet mnemonic={mnemonic} />
        </>
      )}
    </>
  )
}

export default App
