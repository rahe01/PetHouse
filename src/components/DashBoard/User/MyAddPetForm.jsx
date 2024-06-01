import React, { useState } from "react";
import Modal from 'react-modal';
import "./Table.css";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const columnHelper = createColumnHelper();

const columns = (navigate, handleDeleteConfirm) => [
  columnHelper.accessor((row, rowIndex) => rowIndex + 1, {
    id: "serialNumber",
    header: () => <span>Serial Number</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("petName", {
    cell: (info) => info.getValue(),
    header: () => <span>Pet Name</span>,
  }),
  columnHelper.accessor("petCategory", {
    cell: (info) => info.getValue(),
    header: () => <span>Pet Category</span>,
  }),
  columnHelper.accessor("petImage", {
    cell: (info) => (
      <img src={info.getValue()} alt="Pet" className="w-12 h-12 rounded-full" />
    ),
    header: () => <span>Pet Image</span>,
  }),
  columnHelper.accessor("adopted", {
    cell: (info) => (info.getValue() ? "Adopted" : "Not Adopted"),
    header: () => <span>Adoption Status</span>,
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const {  _id } = row.original;

      const handleUpdate = () => {
        navigate(`/update-pet/${_id}`);
      };

      const handleDelete = () => {
        handleDeleteConfirm(_id);
      };

      const handleAdopt = async () => {
        // Function body as you had before...
      };

      return (
        <div className="flex space-x-2">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white py-1 px-2 rounded"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-1 px-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={handleAdopt}
            className="bg-green-500 text-white py-1 px-2 rounded"
          >
            Adopt
          </button>
        </div>
      );
    },
  }),
];

function MyAddPetForm() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    if (user?.email) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/my-pets/${user.email}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [user]);

  const handleDeleteConfirm = (petId) => {
    setPetToDelete(petId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/pets/${petToDelete}`
      );
      if (response.status === 200) {
        console.log("Pet deleted successfully");
        toast.success("Pet deleted successfully");
      } else {
        console.error("Failed to delete pet");
        toast.error("Failed to delete pet");
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error("Error deleting pet");
    } finally {
      setShowModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setPetToDelete(null);
  };

  const table = useReactTable({
    data,
    columns: columns(navigate, handleDeleteConfirm),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div className="p-2">
      {/* Modal for confirming deletion */}
      <Modal style={customStyles} isOpen={showModal}>
        <div className="modal-content">
          <p>Are you sure you want to delete this pet?</p>
          <div>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        </div>
      </Modal>
      
      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="pagination flex justify-between items-center py-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-blue-500 text-white py-1 px-2 rounded"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-blue-500 text-white py-1 px-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MyAddPetForm;
