import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Web3Provider } from 'react-web3';
import SimpleWalletABI from "../artifacts/contracts/SimpleWallet.sol/SimpleWallet.json";

const SimpleWallet = ({ address }) => {
  const [balance, setBalance] = useState(0);
  const [transferAddress, setTransferAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(SimpleWalletABI.abi, address);
    const getBalance = async () => {
      const balance = await contract.methods.balanceOf(web3.eth.defaultAccount).call();
      setBalance(balance);
    };
    getBalance();
  }, [address]);

  const transfer = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(SimpleWalletABI.abi, address);
    await contract.methods.transfer(transferAddress, transferAmount).send({ from: web3.eth.defaultAccount });
    const balance = await contract.methods.balanceOf(web3.eth.defaultAccount).call();
    setBalance(balance);
  };

  return (
    <div>
      <p>Balance: {balance} ETH</p>
      <input type="text" placeholder="Recipient address" value={transferAddress} onChange={(e) => setTransferAddress(e.target.value)} />
      <input type="number" placeholder="Amount" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} />
      <button onClick={transfer}>Transfer</button>
    </div>
  );
};

export default () => (
  <Web3Provider>
    <SimpleWallet
      address="0x5FbDB2315678afecb367f032d93F642f64180aa3"
    />
  </Web3Provider>
);