import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../Api";
import useAuth from "../../../hooks/useAuth";

const DonationCampaign = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosSecure.post('/donation-campaigns', formData);
      return data;
    },
    onSuccess: () => {
      console.log("Data Saved Successfully");
      toast.success("Donation Campaign Created Successfully!");
      navigate('/dashboard/my-listings');
      setLoading(false);
    },
    onError: (error) => {
      console.error("Error creating donation campaign:", error);
      toast.error("Error creating donation campaign!");
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const maxDonationAmount = form.maxDonationAmount.value;
    const lastDate = form.lastDate.value;
    const shortDescription = form.shortDescription.value;
    const longDescription = form.longDescription.value;

    const image = form.petPicture.files[0];

    try {
      const imageUrl = await imageUpload(image);

      const formData = {
        petPicture: imageUrl,
        maxDonationAmount,
        lastDate,
        shortDescription,
        longDescription,
        userEmail: user?.email,
        userName: user?.name,
        createdAt: new Date().toISOString(),
      };

      await mutation.mutateAsync(formData);
    } catch (error) {
      console.error("Error uploading image or saving donation campaign:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-xl font-semibold mb-4">Create Donation Campaign</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="petPicture" className="block mb-1">Pet Picture:</label>
          <input id="petPicture" name="petPicture" type="file" accept="image/*" className="border border-gray-300 p-2 w-full rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="maxDonationAmount" className="block mb-1">Maximum Donation Amount:</label>
          <input id="maxDonationAmount" name="maxDonationAmount" type="number" className="border border-gray-300 p-2 w-full rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastDate" className="block mb-1">Last Date of Donation:</label>
          <input id="lastDate" name="lastDate" type="date" className="border border-gray-300 p-2 w-full rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="shortDescription" className="block mb-1">Short Description:</label>
          <textarea id="shortDescription" name="shortDescription" className="border border-gray-300 p-2 w-full rounded-md"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="longDescription" className="block mb-1">Long Description:</label>
          <textarea id="longDescription" name="longDescription" className="border border-gray-300 p-2 w-full rounded-md"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default DonationCampaign;
