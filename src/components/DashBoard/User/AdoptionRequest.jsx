import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import { axiosSecure } from '../../../hooks/useAxiosSecure';


const AdoptionRequest = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchAdoptionRequests = async () => {
            if (!user || !user.email) {
                console.error("User is not logged in or email is not available");
                return;
            }
            try {
                const { data } = await axiosSecure.get(`/adoption-requests/${user.email}`);
                setRequests(data);
            } catch (error) {
                console.error("Error fetching adoption requests:", error);
                toast.error("Error fetching adoption requests!");
            }
        };

        fetchAdoptionRequests();
    }, [user]);

    const handleAccept = async (requestId) => {
        try {
            await axiosSecure.post(`/adoption-requests/accept/${requestId}`);
            setRequests(requests.filter(request => request._id !== requestId));
            toast.success("Adoption request accepted successfully!");
        } catch (error) {
            console.error("Error accepting adoption request:", error);
            toast.error("Error accepting adoption request!");
        }
    };

    const handleReject = async (requestId) => {
        try {
            await axiosSecure.post(`/adoption-requests/reject/${requestId}`);
            setRequests(requests.filter(request => request._id !== requestId));
            toast.success("Adoption request rejected successfully!");
        } catch (error) {
            console.error("Error rejecting adoption request:", error);
            toast.error("Error rejecting adoption request!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Adoption Requests</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone Number
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {requests.map(request => (
                            <tr key={request._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{request.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{request.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{request.phoneNumber}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{request.location}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button 
                                        onClick={() => handleAccept(request._id)} 
                                        className="text-green-600 hover:text-green-900 mr-4"
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        onClick={() => handleReject(request._id)} 
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Reject
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

export default AdoptionRequest;
