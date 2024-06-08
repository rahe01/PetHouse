import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllDonation = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-donationsssssssss` ,{withCredentials: true}); // Adjusted API endpoint
            setDonations(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handlePause = async (id) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/donationssssssssssss/${id}`); // Adjust the API endpoint as needed
            const updatedDonation = response.data;
            setDonations(donations.map(donation => 
                donation._id === id ? { ...donation, paused: updatedDonation.paused } : donation
            ));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/all-donationsssssssss/${id}`); // Adjust the API endpoint as needed
            setDonations(donations.filter(donation => donation._id !== id));
        } catch (err) {
            console.error(err);
        }
    };


    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Donations</h1>
            <ul className="space-y-4">
                {donations.map(donation => (
                    <li key={donation._id} className="p-4 bg-white shadow rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">{donation.petName}</h2>
                        <img src={donation.petPicture} alt={`${donation.petName}`} className="w-32 h-32 object-cover mb-2 rounded" />
                        <p><span className="font-bold">Max Donation Amount:</span> {donation.maxDonationAmount}</p>
                        <p><span className="font-bold">Last Date:</span> {new Date(donation.lastDate).toLocaleDateString()}</p>
                        <p><span className="font-bold">Short Description:</span> {donation.shortDescription}</p>
                        <p><span className="font-bold">Long Description:</span> {donation.longDescription}</p>
                        <p><span className="font-bold">User Email:</span> {donation.userEmail}</p>
                        <p><span className="font-bold">Created At:</span> {new Date(donation.createdAt).toLocaleDateString()}</p>
                        <p><span className="font-bold">Status:</span> {donation.paused ? 'Paused' : 'Active'}</p>
                        <div className="mt-4 space-x-2">
                            <button
                                onClick={() => handlePause(donation._id)}
                                className={`px-4 py-2 rounded ${donation.paused ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}
                            >
                                {donation.paused ? 'Unpause' : 'Pause'}
                            </button>
                          <Link to={`/dashboard/edit-pet/${donation._id}`}>
                          <button
                              
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Edit
                            </button>
                          
                          </Link>
                            <button
                                onClick={() => handleDelete(donation._id)}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllDonation;
