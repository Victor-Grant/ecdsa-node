import { useState } from "react";
import server from "./server";
import { utf8ToBytes, bytesToHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { sign, recoverPublicKey } from "ethereum-cryptography/secp256k1.js";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const signTransaction = async () => {
    const messageHash = keccak256(utf8ToBytes(" "));
    const [signature, recoveredBit] = await sign(messageHash, address, {
      recovered: true,
    });
    return { signature, recoveredBit, messageHash };
  };

  async function transfer(evt) {
    evt.preventDefault();

    const transactionSignature = await signTransaction();
    const key = recoverPublicKey(
      transactionSignature.messageHash,
      transactionSignature.signature,
      transactionSignature.recoveredBit
    );
    console.log(transactionSignature.recoveredBit);

    console.log("key: " + bytesToHex(key).slice(-20));

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        transactionSignature,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
