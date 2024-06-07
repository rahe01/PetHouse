import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import { axiosSecure } from '../../../hooks/useAxiosSecure';

const MyDonate = () => {
    const { user } = useAuth();
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchDonations = async () => {
            if (!user || !user.email) {
                console.error("User is not logged in or email is not available");
                return;
            }
            try {
                const { data } = await axiosSecure.get(`/my-donate/${user.email}`);
                setDonations(data);
            } catch (error) {
                console.error("Error fetching donations:", error);
                toast.error("Error fetching donations!");
            }
        };

        fetchDonations();
    }, [user]);

    const handleRefund = async (donationId) => {
        try {
            await axiosSecure.delete(`/my-donate/${donationId}`);
            setDonations(donations.filter(donation => donation._id !== donationId));
            toast.success("Donation refunded successfully!");
        } catch (error) {
            console.error("Error refunding donation:", error);
            toast.error("Error refunding donation!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-semibold mb-4">My Donations</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Pet Image
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Pet Name
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Donated Amount
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {donations.map(donation => (
                            <tr key={donation._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img className="h-10 w-10 rounded-full" src={donation.petPic} alt={donation.petName} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{donation.petName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        ${donation.amount}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button 
                                        onClick={() => handleRefund(donation._id)} 
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Ask for Refund
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonate;
