import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import { axiosSecure } from "../../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../../Api";


const EditDonation = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState(data);
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosSecure.put(`/donation-campaignsss/${formData._id}`, formData);
      return data;
    },
    onSuccess: () => {
      toast.success("Donation Campaign Updated Successfully!");
      navigate('/dashboard/my-donation-campaign');
      setLoading(false);
    },
    onError: (error) => {
      console.error("Error updating donation campaign:", error);
      toast.error("Error updating donation campaign!");
      setLoading(false);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const petName = form.petName.value;
    const maxDonationAmount = form.maxDonationAmount.value;
    const lastDate = form.lastDate.value;
    const shortDescription = form.shortDescription.value;
    const longDescription = form.longDescription.value;
    const image = form.petPicture.files[0];

    try {
      let imageUrl = formData.petPicture;
      if (image) {
        imageUrl = await imageUpload(image);
      }

      const updatedFormData = {
        ...formData,
        petName,
        petPicture: imageUrl,
        maxDonationAmount,
        lastDate,
        shortDescription,
        longDescription,
        userEmail: user?.email,
        userName: user?.name,
        updatedAt: new Date().toISOString(),
      };

      await mutation.mutateAsync(updatedFormData);
    } catch (error) {
      console.error("Error uploading image or updating donation campaign:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-xl font-semibold mb-4">Edit Donation Campaign</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="petName" className="block mb-1">Pet Name:</label>
          <input
            id="petName"
            name="petName"
            type="text"
            value={formData.petName}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="petPicture" className="block mb-1">Pet Picture:</label>
          <input
            id="petPicture"
            name="petPicture"
            type="file"
            accept="image/*"
            className="border border-gray-300 p-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="maxDonationAmount" className="block mb-1">Maximum Donation Amount:</label>
          <input
            id="maxDonationAmount"
            name="maxDonationAmount"
            type="number"
            value={formData.maxDonationAmount}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastDate" className="block mb-1">Last Date of Donation:</label>
          <input
            id="lastDate"
            name="lastDate"
            type="date"
            value={formData.lastDate}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="shortDescription" className="block mb-1">Short Description:</label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="longDescription" className="block mb-1">Long Description:</label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" disabled={loading}>
          {loading ? "Submitting..." : "Update Donation"}
        </button>
      </form>
    </div>
  );
};

export default EditDonation;
