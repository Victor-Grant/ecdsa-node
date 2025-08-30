import React from "react";

const List = () => {
  return (
    <div className="ListContainer">
      <h4>List of Wallets</h4>
      <div>
        <label>
          Private Key
          <input
            type="text"
            value={
              "fc36052b4e5952694e12680837d9f1537483d26a92a1de5bb57180b5c1267443"
            }
            readOnly
          />
        </label>
        <label>
          Wallet Address
          <input type="text" value={"0x2345abb3c1fd70045aba"} readOnly />
        </label>
        <div>Balance: 100</div>
      </div>
      <div>
        <label>
          Private Key
          <input
            type="text"
            value={
              "afa001765efb91a28c112c82023b569cfbd15e27ba87abd95023b05e035b5628"
            }
            readOnly
          />
        </label>
        <label>
          Wallet Address
          <input type="text" value={"0x5b2802576ed7cf39cde4"} readOnly />
        </label>
        <div>Balance: 50</div>
      </div>
      <div>
        <label>
          Private Key
          <input
            type="text"
            value={
              "0a255988ca20229ab821842e39caf67deb8222f495b64cb3a70c1119c41eaa10"
            }
            readOnly
          />
        </label>
        <label>
          Wallet Address
          <input type="text" value={"0x2ecf5de5be8882dc6833"} readOnly />
        </label>
        <div>Balance: 75</div>
      </div>
    </div>
  );
};

export default List;
