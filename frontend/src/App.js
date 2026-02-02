import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import "./App.css";


function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask tidak ditemukan");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balanceWei = await provider.getBalance(address);

      setAccount(address);
      setBalance(ethers.formatEther(balanceWei));
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/transactions");
      setTransactions(res.data);
    } catch (err) {
      setError("Gagal mengambil data transaksi backend");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
  <div className="app-container">
    <h1>📊 Full-Stack Blockchain App</h1>

    <button onClick={connectWallet}>Connect Wallet</button>

    {account && (
      <div className="wallet-card">
        <p><strong>Address:</strong></p>
        <p>{account}</p>
        <p><strong>Balance:</strong> {balance} ETH</p>
      </div>
    )}

    <h2>📄 Transaksi (Backend)</h2>

    <div className="transaction-grid">
      {transactions.map((tx) => (
        <div className="transaction-card" key={tx.id}>
          <p><strong>ID:</strong> {tx.id}</p>
          <p><strong>From:</strong> {tx.from}</p>
          <p><strong>Amount:</strong> {tx.amount} ETH</p>
        </div>
      ))}
    </div>

    {error && <p className="error">{error}</p>}
  </div>
);
}

export default App;
