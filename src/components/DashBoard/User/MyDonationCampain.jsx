// MyDonationCampaign.js
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  LinearProgress,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { Pause, Edit, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const MyDonationCampain = () => {
  const [donations, setDonations] = useState([]);
  const {user} = useAuth()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/donation-campaigns/${user.email}` , { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch((err) => console.log(err));
  }, []);

  const [openDonators, setOpenDonators] = useState(false);
  const [selectedDonators, setSelectedDonators] = useState([]);

  const handlePause = (id) => {
    setDonations(
      donations.map((donation) =>
        donation.id === id
          ? { ...donation, paused: !donation.paused }
          : donation
      )
    );
  };

  const handleViewDonators = (donators) => {
    setSelectedDonators(donators);
    setOpenDonators(true);
  };

  const handleClose = () => setOpenDonators(false);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pet Name</TableCell>
              <TableCell>Max Donation Amount</TableCell>
              <TableCell>Donation Progress</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation._id}>
                <TableCell>{donation.petName}</TableCell>
                <TableCell>{donation.maxDonationAmount}</TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (donation.currentAmount / donation.maxDonationAmount) *
                      100
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    // color={donation.paused ? "secondary" : "primary"}
                    startIcon={<Pause />}
                    onClick={() => handlePause(donation.id)}
                  >
                    {donation.paused ? "Unpause" : "Pause"}
                  </Button>
                  <Link
                    to={`/dashboard/edit-donation-campaign/${donation._id}`}
                  >
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      style={{ marginLeft: "10px" }}
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    // color="primary"
                    startIcon={<Visibility />}
                    onClick={() => handleViewDonators(donation.donators)}
                    style={{ marginLeft: "10px" }}
                  >
                    View Donators
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={openDonators}
        onClose={handleClose}
        aria-labelledby="donators-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid ",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="donators-modal-title" variant="h6" component="h2">
            Donators
          </Typography>
          {selectedDonators.map((donator, index) => (
            <Typography key={index}>
              {donator.name}: ${donator.amount}
            </Typography>
          ))}
        </Box>
      </Modal>
    </div>
  );
};

export default MyDonationCampain;
