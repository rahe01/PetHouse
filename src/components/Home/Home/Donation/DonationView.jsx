import { useState } from 'react';
import DonationModal from './DonationModal';
import RecommendedDonations from './RecommendedDonations';
import { useLoaderData } from 'react-router-dom';

const DonationView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = useLoaderData();
  const aderEmail = data.userEmail
  const petPic = data.petPicture
  const petName = data.petName

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Donation Campaign</h1>
        <p className="mb-4 text-gray-700">Max Donation Amount: ${data.maxDonationAmount}</p>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Donate Now
        </button>
      </div>
      {isModalOpen && <DonationModal aderEmail={aderEmail} petName={petName} petPic={petPic}  closeModal={closeModal} />}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recommended Donations</h2>
        <RecommendedDonations />
      </div>
    </div>
  );
};

export default DonationView;
