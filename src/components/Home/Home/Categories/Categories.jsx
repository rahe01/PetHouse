
import { useEffect, useState } from "react";

// Correct path to your JSON file
import catagory from "../../../../../public/categories.json"; // Adjust the path as needed
import CategorieCard from "./CategorieCard";
import LoadingSpinner from "../../../Shared/LoadingSpinner";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        // Since it's a local JSON file, you don't need to use axios.get
        // You can directly use the imported JSON file
        setCategories(catagory);
        setLoading(false);
    }, []);

    console.log(categories);

    return (
        <div>
         <h1 className="text-3xl font-bold text-[#5dbfec] text-center mt-5">Categories of Pets</h1>
      <div className="grid grid-cols-3 rounded-3xl py-5 lg:py-10">
        <div className="h-[5px] bg-[#5dbfec] col-span-2 rounded-l-3xl"></div>
        <div className="h-[5px] bg-[#F7A21E] rounded-r-3xl "></div>
      </div>

            {loading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <CategorieCard key={category.id} category={category} />
                    ))}
                    
                </div>
            )}
        </div>
    );
};

export default Categories;
