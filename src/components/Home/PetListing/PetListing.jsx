import { useEffect, useState } from "react";
import PetListingCard from "./PetListingCard";

const PetListing = () => {
    const [pets, setPets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/notadopted`)
            .then(res => res.json())
            .then(data => {
                // Sort the pets by dateAdded in descending order
                const sortedPets = data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                setPets(sortedPets);
            });
    }, []);

    const filteredPets = pets.filter(pet => {
        const matchesSearchTerm = pet.petName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || pet.petCategory === selectedCategory;
        return matchesSearchTerm && matchesCategory;
    });

    return (
        <div>
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border p-2 rounded"
                />
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="all">All Categories</option>
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    <option value="rabbit">Rabbit</option>
                    {/* Add more categories as needed */}
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredPets.map(pet => (
                    <PetListingCard key={pet.id} pet={pet} />
                ))}
            </div>
        </div>
    );
};

export default PetListing;
