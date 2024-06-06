import  { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { HiOutlineStatusOnline } from "react-icons/hi";
import * as Yup from 'yup';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom'; // or your routing library
import { toast } from 'react-toastify'; // if you're using react-toastify for notifications
import useAuth from '../../../hooks/useAuth';

const petCategories = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'bird', label: 'Bird' },
  { value: 'other', label: 'Other' },
];

const PetSchema = Yup.object().shape({
  petImage: Yup.string().required('Pet image is required'),
  petName: Yup.string().required('Pet name is required'),
  petAge: Yup.number().required('Pet age is required').min(0, 'Age must be positive'),
  petCategory: Yup.string().required('Pet category is required'),
  petLocation: Yup.string().required('Pet location is required'),
  shortDescription: Yup.string().required('Short description is required'),
  longDescription: Yup.string().required('Long description is required'),
});

const PetForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user} = useAuth()
  console.log(user)

 
  

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
   

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
      return data.data.display_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Add a Pet</h1>
      <Formik
        initialValues={{
          petImage: '',
          petName: '',
          petAge: '',
          petCategory: '',
          petLocation: '',
          shortDescription: '',
          longDescription: '',
        }}
        validationSchema={PetSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          setLoading(true);
          try {
            const imageFile = document.getElementById('petImage').files[0];
            const imageURL = await uploadImage(imageFile);

            if (!imageURL) {
              throw new Error('Image upload failed');
            }
            const petData = {
                ...values,
                petImage: imageURL,
                dateAdded: new Date().toISOString(),
                adopted: false,
                userDisplayName: user.displayName, // Add user info here
                userEmail: user.email,
                userPhotoURL: user.photoURL,
              };
  

            // Replace with your API endpoint to save the pet data
            await axios.post(`${import.meta.env.VITE_API_URL}/pets`, petData);
            setSubmitting(false);
            navigate('my-added-pet');
            toast.success('Pet added successfully!');
          } catch (error) {
            console.error('Form submission error:', error);
            setFieldError('general', 'Failed to submit the form');
            setSubmitting(false);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="petImage" className="mb-2 text-lg font-medium">Pet Image</label>
              <input
                id="petImage"
                name="petImage"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue('petImage', file.name);
                }}
              />
              <ErrorMessage name="petImage" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="petName" className="mb-2 text-lg font-medium">Pet Name</label>
              <Field id="petName" name="petName" placeholder="Pet Name" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="petName" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="petAge" className="mb-2 text-lg font-medium">Pet Age</label>
              <Field id="petAge" name="petAge" placeholder="Pet Age" type="number" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="petAge" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="petCategory" className="mb-2 text-lg font-medium">Pet Category</label>
              <Select
                id="petCategory"
                name="petCategory"
                options={petCategories}
                className="basic-single"
                classNamePrefix="select"
                onChange={(option) => setFieldValue('petCategory', option.value)}
              />
              <ErrorMessage name="petCategory" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="petLocation" className="mb-2 text-lg font-medium">Pet Location</label>
              <Field id="petLocation" name="petLocation" placeholder="Pet Location" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="petLocation" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="shortDescription" className="mb-2 text-lg font-medium">Short Description</label>
              <Field id="shortDescription" name="shortDescription" placeholder="Short Description" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="shortDescription" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="longDescription" className="mb-2 text-lg font-medium">Long Description</label>
              <Field id="longDescription" name="longDescription" as="textarea" placeholder="Long Description" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="longDescription" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600" disabled={isSubmitting || loading}>
                {loading ? <HiOutlineStatusOnline    className='animate-spin m-auto'   ></HiOutlineStatusOnline>      : 'Submit'}
              </button>
            </div>
            <ErrorMessage name="general" component="div" className="text-red-600 text-sm mt-1" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PetForm;
