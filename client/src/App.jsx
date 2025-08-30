import Wallet from "./Wallet";
import Transfer from "./Transfer";
import List from "./List";
import "./App.scss";
import { useState } from "react";
import { getPublicKey } from "ethereum-cryptography/secp256k1.js";
import { bytesToHex, hexToBytes } from "ethereum-cryptography/utils.js";

const pKeyA =
  "fc36052b4e5952694e12680837d9f1537483d26a92a1de5bb57180b5c1267443";
const pKeyB =
  "afa001765efb91a28c112c82023b569cfbd15e27ba87abd95023b05e035b5628";
const pKeyC =
  "0a255988ca20229ab821842e39caf67deb8222f495b64cb3a70c1119c41eaa10";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  // const createRandomKey = () => {
  //   const keys = new Uint8Array(32);
  //   const privateKey = bytesToHex(crypto.getRandomValues(keys));
  // };

  // const pubKeyA = hexToBytes(pKeyA);
  // const pubKeyB = hexToBytes(pKeyB);
  // const pubKeyC = hexToBytes(pKeyC);

  // const publicKeyA = bytesToHex(getPublicKey(pubKeyA));
  // const publicKeyB = bytesToHex(getPublicKey(pubKeyB));
  // const publicKeyC = bytesToHex(getPublicKey(pubKeyC));

  // console.log(publicKeyA.slice(-20));
  // console.log(publicKeyB.slice(-20));
  // console.log(publicKeyC.slice(-20));

  // createRandomKey();

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
      <List />
    </div>
  );
}

export default App;
