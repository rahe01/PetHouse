import { Link } from "react-router-dom";

const PetListingCard = ({ pet }) => {
    console.log('Rendering PetListingCard for pet:', pet); // Log the pet data being rendered
    return (
        <div className="bg-white shadow-md rounded-md p-4 flex flex-col items-center">
            <img src={pet.petImage} alt={pet.petName} className="w-full h-auto rounded-md mb-4" />
            <h3 className="text-lg font-semibold mb-2">{pet.petName}</h3>
            <p className="text-sm text-gray-600 mb-2">Age: {pet.petAge}</p>
            <p className="text-sm text-gray-600 mb-4">Location: {pet.petLocation}</p>
           <Link to={`/petdetails/${pet._id}`}><button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">View details</button></Link>
        </div>
    );
};

export default PetListingCard;