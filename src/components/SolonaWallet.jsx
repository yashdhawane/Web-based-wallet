import { useState } from "react"
import { mnemonicToSeed } from "bip39"
import { derivePath } from "ed25519-hd-key"
import { Keypair } from "@solana/web3.js"
import nacl from "tweetnacl"

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0)
//   const [publicKeys, setPublicKeys] = useState([])
const [keypairs, setKeypairs] = useState([])

  return (
    <div>
      <h2>Solana Wallet</h2>
      <button onClick={async function() {
        const seed = await mnemonicToSeed(mnemonic)
        const path = `m/44'/501'/${currentIndex}'/0'`
        const derivedSeed = derivePath(path, seed.toString("hex")).key
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
        const keypair = Keypair.fromSecretKey(secret)
        setCurrentIndex(currentIndex + 1)
        // setPublicKeys([...publicKeys, keypair.publicKey])
        setKeypairs([...keypairs, { publicKey: keypair.publicKey, secretKey: secret }])

      }}>
        Add Solana Wallet
      </button>
      {keypairs.map((keypair, index) => (
        <div key={index}>
          <div>Solana Public Key: {keypair.publicKey.toBase58()}</div>
          <div>Solana Private Key: {Buffer.from(keypair.secretKey).toString('hex')}</div>
        </div>
      ))}
    </div>
  )
}