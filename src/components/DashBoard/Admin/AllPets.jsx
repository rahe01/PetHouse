import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllPets = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchPets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axiosSecure]);

    const fetchPets = async () => {
        try {
            const response = await axiosSecure.get('/all-pets');
            setPets(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pets:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (petId) => {
        try {
            await axiosSecure.delete(`/all-pets/${petId}`);
            fetchPets();
        } catch (error) {
            console.error('Error deleting pet:', error);
        }
    };

    const handleUpdateStatus = async (petId, currentStatus) => {
        const newStatus = currentStatus === "true" ? "false" : "true";
        try {
            await axiosSecure.put(`/all-pets/${petId}`, { status: newStatus });
            fetchPets();
        } catch (error) {
            console.error('Error updating pet status:', error);
        }
    };

    const renderPetsTable = () => {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">ID</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Name</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Type</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Status</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map(pet => (
                            <tr key={pet._id}>
                                <td className="py-2 px-4 border-b border-gray-200">{pet._id}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{pet.petName}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{pet.petCategory}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{pet.adopted === "true" ? 'Adopted' : 'Not Adopted'}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <button
                                        onClick={() => handleUpdateStatus(pet._id, pet.adopted)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                                    >
                                        {pet.adopted === "true" ? 'Mark as Not Adopted' : 'Mark as Adopted'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pet._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Pets</h1>
            {loading ? <p className="text-gray-500">Loading...</p> : renderPetsTable()}
        </div>
    );
};

export default AllPets;
