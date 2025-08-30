import server from "./server";
import { getPublicKey } from "ethereum-cryptography/secp256k1.js";
import { bytesToHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    const publicKey = `0x${bytesToHex(getPublicKey(address)).slice(-20)}`;
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${publicKey}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Keys
        <input
          placeholder="Type in private keys"
          value={address}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
