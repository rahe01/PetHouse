import{ useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecommendedDonations = () => {
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Fetch donation by ID
    const fetchDonation = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/donationsss/${id}`);
        setDonation(response.data);
      } catch (error) {
        console.error("Error fetching the donation", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDonation();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!donation) {
    return <div>No donation found</div>;
  }

  return (
    <div>
      <h3>{donation.title}</h3>
      <p>{donation.description}</p>
    </div>
  );
};

export default RecommendedDonations;
