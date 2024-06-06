import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const DonationForm = ({ closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (amount && amount > 0) {
        setLoading(true); // Start loading
        console.log("Fetching client secret for amount:", amount);
        try {
          const response = await axiosSecure.post(`/create-payment-intent`, { price: amount });
          if (response.data && response.data.clientSecret) {
            console.log("Received client secret:", response.data.clientSecret);
            setClientSecret(response.data.clientSecret);
          } else {
            console.error("Invalid client secret format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching client secret:", error);
        } finally {
          setLoading(false); // End loading
          console.log("Finished fetching client secret");
        }
      }
    };

    fetchClientSecret();
  }, [amount, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe) {
      console.error("Stripe.js has not loaded.");
      setProcessing(false);
      return;
    }

    if (!elements) {
      console.error("Stripe Elements has not loaded.");
      setProcessing(false);
      return;
    }

    if (!clientSecret) {
      console.error("ClientSecret is not set.");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (cardElement == null) {
      console.error("CardElement not found.");
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error("Error creating payment method:", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      console.error("Error confirming card payment:", confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      console.log('Payment successful:', paymentIntent);

      try {
        await axiosSecure.post(`${import.meta.env.VITE_API_URL}/donations`, {
          amount,
          transactionId: paymentIntent.id,
          date: new Date(),
        });
        closeModal();
        alert('Donation successful!');
      } catch (err) {
        console.error('Error saving donation:', err);
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-gray-700">Donation Amount:</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>
      <div className="mt-4">
        <CardElement className="p-2 border border-gray-300 rounded-md shadow-sm" />
      </div>
      {cardError && <div className="text-red-500">{cardError}</div>}
      <div className="flex space-x-2 mt-4">
        <button
          type="submit"
          disabled={!stripe || processing || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {processing ? 'Processing...' : 'Donate'}
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
      {loading && <div className="text-gray-500">Loading...</div>}
    </form>
  );
};

export default DonationForm;
