import { Helmet } from 'react-helmet-async'
import SecondLay from '../../layouts/SecondLay'


const Home = () => {
  return (
    <div>
      <Helmet>
      <title>Home</title>
      </Helmet>
      <SecondLay></SecondLay>
   
    </div>
  )
}

export default Home
