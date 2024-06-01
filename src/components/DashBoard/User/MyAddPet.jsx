
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Tbody, Tr, Td, Th, Thead } from '@tanem/react-table'; // Assuming this is how Tanstack Table components are imported
import Modal from 'react-modal';

const MyAddPet = () => {
  const [pets, setPets] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/pets`);
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchPets();
  }, []);

  const handleDelete = async () => {
    if (selectedPet) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/pets/${selectedPet.id}`);
        setPets(pets.filter(pet => pet.id !== selectedPet.id));
        closeModal();
      } catch (error) {
        console.error('Error deleting pet:', error);
      }
    }
  };

  const handleAdopted = async (petId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/pets/${petId}`, { adopted: true });
      const updatedPets = pets.map(pet => {
        if (pet.id === petId) {
          return { ...pet, adopted: true };
        }
        return pet;
      });
      setPets(updatedPets);
    } catch (error) {
      console.error('Error marking pet as adopted:', error);
    }
  };

  const openModal = (pet) => {
    setSelectedPet(pet);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPet(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>My Added Pets</h1>
      <Table>
        <Thead>
          <Tr>
            <Th>Pet Name</Th>
            <Th>Pet Category</Th>
            <Th>Pet Image</Th>
            <Th>Adoption Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pets.map((pet, index) => (
            <Tr key={index}>
              <Td>{pet.petName}</Td>
              <Td>{pet.petCategory}</Td>
              <Td><img src={pet.petImage} alt={pet.petName} style={{ width: '100px' }} /></Td>
              <Td>{pet.adopted ? 'Adopted' : 'Not Adopted'}</Td>
              <Td>
                <button onClick={() => handleAdopted(pet.id)} disabled={pet.adopted}>Adopted</button>
                <button onClick={() => openModal(pet)}>Delete</button>
                {/* Add Update Button with appropriate redirection */}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal for confirming deletion */}
      <Modal isOpen={modalIsOpen}>
        <div>
          <h2>Delete Pet</h2>
          <p>Are you sure you want to delete this pet?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={closeModal}>No</button>
        </div>
      </Modal>
    </div>
  );
};

export default MyAddPet;
