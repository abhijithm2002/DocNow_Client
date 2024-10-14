import { useState, useEffect } from 'react';
import { AiOutlineWallet } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { fetchWalletHistory } from '../../../services/Doctor/doctorService';
import PaginationComponent from '../../Pagination/PaginationComponent';

const WalletHistory = () => {
  const [walletAmount, setWalletAmount] = useState(0);
  const [walletHistory, setWalletHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorId = useSelector((state) => state.doctor.doctor._id);
  const itemsPerPage = 5;
  
  const indexOfLastWallet = currentPage * itemsPerPage;
  const indexOfFirstWallet = indexOfLastWallet - itemsPerPage;

  const currentWallet = walletHistory.slice(indexOfFirstWallet, indexOfLastWallet);
  const totalPages = Math.ceil(walletHistory.length / itemsPerPage);

  useEffect(() => {
    const getWalletHistory = async (doctorId) => {
      try {
        const response = await fetchWalletHistory(doctorId);
        const walletData = response.data.data;
        const sortedWalletHistory = walletData.WalletHistory.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setWalletAmount(walletData.Wallet || 0);
        setWalletHistory(sortedWalletHistory);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    if (doctorId) {
      getWalletHistory(doctorId);
    }
  }, [doctorId]);

  return (
    <div className="font-sans mt-top space-y-6">
      <div className="mt-0 relative flex items-center justify-between p-4 bg-blue-300 shadow-lg rounded-lg border border-gray-200 transform transition-transform duration-300 hover:scale-105">
        <div className="flex items-center space-x-3">
          <AiOutlineWallet className="text-3xl text-white animate-bounce" />
          <div>
            <h2 className="text-xl font-bold text-white">Wallet Amount</h2>
            <p className="text-2xl font-semibold text-white">₹ {walletAmount}</p>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Date</th>
              <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Message</th>
              <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentWallet.length > 0 ? (
              currentWallet.map((transaction, index) => {
                const isCancelled = transaction.message.toLowerCase().includes("cancelled");

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
                        isCancelled ? 'text-red-400' : transaction.amount >= 0 ? 'text-green-400' : ''
                      }`}
                    >
                      {isCancelled ? `- ${Math.abs(transaction.amount)}` : `+ ${transaction.amount}`}
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

        {walletHistory.length > 0 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default WalletHistory;
