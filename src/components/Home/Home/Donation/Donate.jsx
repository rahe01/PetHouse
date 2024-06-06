import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Donate = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/donationsss`);
                const sortedCampaigns = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCampaigns(sortedCampaigns);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching donation campaigns:', error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Donation Campaigns</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {campaigns.map((campaign) => (
                        <div key={campaign._id} className="bg-white rounded-lg shadow-md p-4">
                            <img src={campaign.petPicture} alt={campaign.petName} className="w-full h-auto rounded-md mb-4" />
                            <h2 className="text-xl font-semibold mb-2">{campaign.petName}</h2>
                            <p className="text-gray-600 mb-2">Maximum Donation: ${campaign.maxDonationAmount}</p>
                            <p className="text-gray-600 mb-2">Donated Amount: ${campaign.donatedAmount}</p>
                            <Link to={`/donationDetails/${campaign._id}`}><button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                                View Details
                            </button></Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Donate;
