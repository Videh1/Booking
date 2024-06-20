import React, { useEffect } from 'react'
import AccountNav from './AccountNav'
import { useState } from 'react';
import axios from 'axios';
import PlaceImg from '../PlaceImg';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

const BookingsPage = () => {

  const [bookings, setBookings] = useState([]);
  const [loader , setLoader] = useState(true);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
      setLoader(false)
    })
  }, [])


  if(loader)
    {
      return (<Loader/>)
    }
  return (
    <div class="p-4">
    <AccountNav />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          bookings?.length > 0 && bookings.map(booking => (
            <div>
                <div class='h-48 overflow-hidden'>
                    <PlaceImg place={booking.place} />
                </div>
                <div class='p-4'>
                    <h2 class='text-xl font-bold mb-2'>{booking?.place?.title}</h2> 
                    <div class='text-gray-700 mb-4'>
                        <div class='flex items-center mb-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights
                        </div>
                        <div class='flex items-center mb-2'>
                        📅
                            {format(new Date(booking.checkIn), 'dd-MM-yyyy')} &rarr; {format(new Date(booking.checkOut), 'dd-MM-yyyy')}
                        </div>
                        <div class='flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg>
                            Total Price : ${booking.price}
                        </div>
                    </div>
                </div>
            </div>
          ))
        }
    </div>
</div>

  )
}

export default BookingsPage
