import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DonationForm from './DonationForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const DonationModal = ({ closeModal ,aderEmail ,petName ,petPic}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <Elements stripe={stripePromise}>
          <DonationForm aderEmail={aderEmail} petPic={petPic} petName={petName} closeModal={closeModal} />
        </Elements>
      </div>
    </div>
  );
};

export default DonationModal;
