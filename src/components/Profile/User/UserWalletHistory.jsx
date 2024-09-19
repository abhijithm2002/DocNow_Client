import React, { useEffect, useState } from 'react';
import { AiOutlineWallet } from 'react-icons/ai';
import { getWalletHistory } from '../../../services/User/userService';
import { useSelector } from 'react-redux';

const UserWalletHistory = () => {
  const [walletAmount, setWalletAmount] = useState(0);
  const [walletHistory, setWalletHistory] = useState([]);
  const patientId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    const fetchWalletHistory = async (patientId) => {
      try {
        const response = await getWalletHistory(patientId);
        const walletData = response.data.data;

        const sortedWalletHistory = walletData.WalletHistory.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        const filteredWalletHistory = sortedWalletHistory.filter(transaction => transaction.amount !== 0);

        setWalletAmount(walletData.Wallet || 0);
        setWalletHistory(filteredWalletHistory);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    if (patientId) {
      fetchWalletHistory(patientId);
    }
  }, [patientId]);

  return (
    <div className="font-sans p-4 space-y-6">
      <div className="mt-0 relative flex items-center justify-between p-4 bg-blue-300 shadow-lg rounded-lg border border-gray-200 transform transition-transform duration-300 hover:scale-105">
        <div className="flex items-center space-x-3">
          <AiOutlineWallet className="text-3xl text-white animate-bounce" />
          <div>
            <h2 className="text-xl font-bold text-white">Wallet Amount</h2>
            <p className="text-2xl font-semibold text-white">₹ {walletAmount}</p>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto w-full">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Date</th>
              <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Message</th>
              <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {walletHistory.length > 0 ? (
              walletHistory.map((transaction, index) => {
                const isDeduction = transaction.message.toLowerCase().includes("deducted");
                const isRefund = transaction.message.toLowerCase().includes("refund");

                return (
                  <tr
                    key={index}
                    className="bg-white border-b text-gray-500 transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:shadow-md"
                  >
                    <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">
                      {transaction.message}
                    </td>
                    <td
                      className={`px-4 py-2 md:px-6 md:py-4 font-semibold ${
                        isDeduction
                          ? 'text-red-400'
                          : isRefund
                          ? 'text-green-400'
                          : transaction.amount >= 0
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {transaction.amount >= 0 ? `+ ${transaction.amount}` : `- ${Math.abs(transaction.amount)}`}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-2 md:px-6 md:py-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserWalletHistory;
