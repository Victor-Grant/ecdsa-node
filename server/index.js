const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const {
  verify,
  getPublicKey,
  recoverPublicKey,
} = require("ethereum-cryptography/secp256k1");
const { bytesToHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "0x2345abb3c1fd70045aba": 100,
  "0x5b2802576ed7cf39cde4": 50,
  "0x2ecf5de5be8882dc6833": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { transactionSignature, recipient, amount } = req.body;

  const messageHash = new Uint8Array(
    Object.values(transactionSignature.messageHash)
  );
  const signature = new Uint8Array(
    Object.values(transactionSignature.signature)
  );

  const publicKey = recoverPublicKey(
    bytesToHex(messageHash),
    signature,
    transactionSignature.recoveredBit
  );

  const sender = `0x${bytesToHex(publicKey).slice(-20)}`;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
