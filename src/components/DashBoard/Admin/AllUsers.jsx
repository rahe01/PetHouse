import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useRole from '../../../useRole';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [role ] = useRole()

    useEffect(() => {
        axiosSecure.get('/users')  // Replace with your API endpoint
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, [axiosSecure]);

    const makeAdmin = (userId) => {
        axiosSecure.put(`/admin/${userId}`)  // Replace with your API endpoint
            .then(response => {
                if (response.data.success) {
                    setUsers(users.map(user => user._id === userId ? { ...user, role: 'admin' } : user));
                    toast.success('Roles updated successfully');
                }
            })
            .catch(error => {
                console.error('Error making user admin:', error);
                toast.error('Failed to update role');
            });
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">All Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700">Email</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700">Profile Picture</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <img src={user.photo} alt={`${user.name}'s profile`} className="w-12 h-12 rounded-full" />
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    {user.role !== 'admin' && (
                                        <button 
                                        disabled= {role == 'admin'}
                                            onClick={() => makeAdmin(user._id)} 
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
