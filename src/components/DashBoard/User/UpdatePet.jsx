import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Select from 'react-select';
import { toast } from 'react-toastify';


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

const UpdatePet = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets/${id}` ,{withCredentials: true});
        const petData = response.data;
        setInitialValues({
          petImage: petData.petImage,
          petName: petData.petName,
          petAge: petData.petAge,
          petCategory: petData.petCategory,
          petLocation: petData.petLocation,
          shortDescription: petData.shortDescription,
          longDescription: petData.longDescription,
        });
      } catch (error) {
        setError('Failed to fetch pet data');
        console.error('Failed to fetch pet data:', error);
      }
    };

    fetchPetData();
  }, [id]);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Update Pet</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={PetSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          setLoading(true);
          try {
            let imageURL = values.petImage;
            const imageFile = document.getElementById('petImage').files[0];
            if (imageFile) {
              imageURL = await uploadImage(imageFile);
              if (!imageURL) {
                throw new Error('Image upload failed');
              }
            }
            const petData = {
              ...values,
              petImage: imageURL,
            };

            await axios.put(`${import.meta.env.VITE_API_URL}/pets/${id}`, petData);
            setSubmitting(false);
            navigate('/');
            toast.success('Pet updated successfully!');
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
                  setFieldValue('petImage', file ? file.name : initialValues.petImage);
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
                defaultValue={petCategories.find(option => option.value === initialValues.petCategory)}
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
              <Field id="longDescription" name="longDescription" placeholder="Long Description" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="longDescription" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="flex flex-col">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg" disabled={isSubmitting || loading}>
                {loading ? 'Updating...' : 'Update Pet'}
              </button>
              <ErrorMessage name="general" component="div" className="text-red-600 text-sm mt-1" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePet;
