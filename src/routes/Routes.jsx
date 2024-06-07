import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import DashBoardLayout from '../layouts/DashBoardLayout'

import AddPet from '../components/DashBoard/User/AddPet'
import MyAddPet from '../components/DashBoard/User/MyAddPet'
import UpdatePet from '../components/DashBoard/User/UpdatePet'
import DonationCampaign from '../components/DashBoard/User/DonationCampaign'
import MyDonationCampain from '../../src/components/DashBoard/User/MyDonationCampain'
import PetListing from '../components/Home/PetListing/PetListing'
import PetDetails from '../components/Home/PetListing/PetDetails'
import Donate from '../components/Home/Home/Donation/Donate'
import DonationView from '../components/Home/Home/Donation/DonationView'
import EditDonation from '../components/Home/Home/Donation/EditDonation'
import MyDonate from '../components/DashBoard/User/MyDonate'
import AdoptionRequest from '../components/DashBoard/User/AdoptionRequest'
import Profile from '../components/Profile'
import AllUsers from '../components/DashBoard/Admin/AllUsers'
import AllPets from '../components/DashBoard/Admin/AllPets'



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path : '/petListing',
        element: <PetListing></PetListing>
      },
      {
        path: '/petdetails/:id',
       element: <PetDetails></PetDetails>,
       loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/petsss/${params.id}`)
        
      
       
      },
      {
        path: '/donationCamp',
        element: <Donate></Donate>
      },
      {
        path: '/donationDetails/:id',
        element: <DonationView></DonationView>,
        loader : ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/donationsss/${params.id}`)
      }
    
    ],
  },
  {
    path: '/dashboard',
    element:<DashBoardLayout></DashBoardLayout>,
    children: [
      {
        index: true,
        element: <AddPet></AddPet>
      },
      {
        path: 'my-added-pet',
        element: <MyAddPet></MyAddPet>
      },
      {
        path: 'create-donation-campaign',
        element: <DonationCampaign></DonationCampaign>
      },
      {
      path: 'my-donation-campaign',
      element: <MyDonationCampain></MyDonationCampain>},
      {
        path: 'edit-donation-campaign/:id',
        element: <EditDonation></EditDonation>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/donation-campaigns/${params.id}`)
      },
      {
        path: 'my-donates',
        element: <MyDonate></MyDonate>,
        
      },
      {
        path: 'adoption-request',
        element : <AdoptionRequest></AdoptionRequest>
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'all-users',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'all-pets',
        element: <AllPets></AllPets>
      }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {path: '/update-pet/:id', element : <UpdatePet></UpdatePet>}
])
