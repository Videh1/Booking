
import './App.css'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContext, UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacePage from './pages/PlacePage'
import BookingPage from './pages/BookingPage'
import BookingsPage from './pages/BookingsPage'

import { useContext } from 'react'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;
function App() {

   const {token} = useContext(UserContext)
   console.log("token", token)

  return (
    
      <Routes>
        <Route path='/' element={<ProtectedRoutes token={token}/>} >
          <Route index element={<IndexPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesFormPage />} />
          <Route path='/account/places/:id' element={<PlacesFormPage />} />
          <Route path='/place/:id' element={<PlacePage />} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          <Route path='/account/bookings/:id' element={<BookingPage />} />
        </Route>
        <Route   element={<PublicRoutes token={token}/>}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        </Route>

      </Routes>
   
   

  )
}



export default App

const ProtectedRoutes=({token})=>{
  
  if(token){
  return(  <Layout>

      <Outlet/>
    </Layout>)
  }
 return <Navigate to={"/login"}/>
}

const PublicRoutes=({token})=>{

  if(token){
  return <Navigate  to={"/"}/>
  }
  return <Outlet/>



}
