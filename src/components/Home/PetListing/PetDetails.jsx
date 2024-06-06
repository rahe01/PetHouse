import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Modal from "react-modal";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";

const PetDetails = () => {
    const {user} = useAuth()
    const pet = useLoaderData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    console.log(user)

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAdopt = async (e) => {
        e.preventDefault();
        const form = e.target;
        const number = form.number.value;
        const address = form.address.value;
        const fromData = {
            petId: pet._id,
           Name : user?.displayName,
           email : user?.email,
           number,
           address,
           petName : pet.petName

        }

        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/adoptting`, fromData)
            if(response.data.acknowledged){
                toast.success('Adopted Successfully')
        }

        else{
            toast.error('Something went wrong')
        }

       
    }

    catch(error){
        console.log(error)
    }
    }

    if (!pet) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="bg-white shadow-md rounded-md p-4">
                <img src={pet.petImage} alt={pet.petName} className="w-full h-auto rounded-md mb-4" />
                <h3 className="text-lg font-semibold mb-2">{pet.petName}</h3>
                <p className="text-sm text-gray-600 mb-2">Age: {pet.petAge}</p>
                <p className="text-sm text-gray-600 mb-4">Location: {pet.petLocation}</p>
                <button onClick={openModal} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                    Adopt
                </button>
            </div>

            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Adopt Pet">
                <h2>Adopt {pet.petName}</h2>
                <form onSubmit={handleAdopt}>
                    <div>
                        <label>Pet Name: </label>
                        <span>{pet.petName}</span>
                    </div>
                    <div>
                        <label>User Name: </label>
                        <input type="text" value={user.displayName}  disabled className="border p-2 rounded" />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="text" value={user.email}  disabled className="border p-2 rounded" />
                    </div>
                    <div>
                        <label>Phone Number: </label>
                        <input type="text" name="number" className="border p-2 rounded" />
                    </div>
                    <div>
                        <label>Address: </label>
                        <input type="text" name="address" className="border p-2 rounded" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                        Submit
                    </button>
                </form>
                <button onClick={closeModal} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default PetDetails;
