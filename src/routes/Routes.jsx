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
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {path: '/update-pet/:id', element : <UpdatePet></UpdatePet>}
])
