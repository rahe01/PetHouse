import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import DashBoardLayout from '../layouts/DashBoardLayout'

import AddPet from '../components/DashBoard/User/AddPet'
import MyAddPet from '../components/DashBoard/User/MyAddPet'


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
      }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
