import React from 'react'
import { useAuth } from '../context/UserAuthContext'
import { Link, useNavigate } from "react-router-dom"
import Header from './Header'
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Chart from './Chart';
import { AttendanceTable } from './AttendanceTable';


//2 -> present
//1 -> absent
//0 -> holiday


const Home = () => {

  const { logout } = useAuth()
  const navigate = useNavigate()

  const database = firebase.database();

  database.ref('monthsData/4/dayData').once('value')
  .then((snapshot) => {
    const data = snapshot.val();
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });


  return (
    <>
      <div className='w-full h-full'>Well Come to the home page</div>
      {/* <Chart/> */}
      <AttendanceTable/>
      
    </>
  )
}

export default Home