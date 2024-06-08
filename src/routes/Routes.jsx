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
import AllDonation from '../components/DashBoard/Admin/AllDonation'
import Edit from '../components/DashBoard/Admin/Edit'
import PrivateRoute from './PrivateRoute'



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
        element: <PrivateRoute><PetListing></PetListing></PrivateRoute>
      },
      {
        path: '/petdetails/:id',
       element: <PetDetails></PetDetails>,
       loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/petsss/${params.id}`)
        
      
       
      },
      {
        path: '/donationCamp',
        element: <PrivateRoute><Donate></Donate></PrivateRoute>
      },
      {
        path: '/donationDetails/:id',
        element: <PrivateRoute><DonationView></DonationView></PrivateRoute>,
        loader : ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/donationsss/${params.id}`)
      }
    
    ],
  },
  {
    path: '/dashboard',
    element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <PrivateRoute><AddPet></AddPet></PrivateRoute>
      },
      {
        path: 'my-added-pet',
        element: <PrivateRoute><MyAddPet></MyAddPet></PrivateRoute>
      },
      {
        path: 'create-donation-campaign',
        element: <PrivateRoute><DonationCampaign></DonationCampaign></PrivateRoute>
      },
      {
      path: 'my-donation-campaign',
      element:<PrivateRoute> <MyDonationCampain></MyDonationCampain></PrivateRoute>
    },
      {
        path: 'edit-donation-campaign/:id',
        element: <PrivateRoute><EditDonation></EditDonation></PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/donation-campaigns/${params.id}`)
      },
      {

        path: 'edit-pet/:id',
        element:<PrivateRoute> <Edit></Edit></PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/donation-camssssss/${params.id}`)

      },
      {
        path: 'my-donates',
        element: <PrivateRoute><MyDonate></MyDonate></PrivateRoute>,
        
      },
      {
        path: 'adoption-request',
        element : <PrivateRoute> <AdoptionRequest></AdoptionRequest></PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: 'all-users',
        element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
      },
      {
        path: 'all-pets',
        element: <PrivateRoute><AllPets></AllPets></PrivateRoute>
      },
      {
        path: 'all-donations',
        element: <PrivateRoute><AllDonation></AllDonation></PrivateRoute>
      }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {path: '/update-pet/:id', element : <UpdatePet></UpdatePet>}
])
