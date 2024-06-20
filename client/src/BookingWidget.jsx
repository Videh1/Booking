import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Navigate } from 'react-router-dom';


const BookingWidget = ({ place }) => {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user])
    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace() {
        // Check for empty fields
        if(numberOfGuests > place.maxGuests)
            {
                alert("Number of Guests larger than Maximum Guests")
                return;
            }
        if (!checkIn || !checkOut || !numberOfGuests || !name || !phone || !user || !place._id || !numberOfNights || !place.price) {
            alert("Please fill in all fields.");
            return; 
        }

    
        const response = await axios.post('/bookings', {
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            user,
            place: place._id,
            price: numberOfNights * place.price,
        });
        
        setRedirect('/');
    }
    
    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div class="bg-white shadow p-4 rounded-2xl">
        <div class="text-2xl text-center">
            Price : ${place.price} / per night
        </div>
        <div class="border rounded-2xl mt-4">
            <div class="flex justify-around ">
                <div class="py-4 px-4 border-b border-l border-r">
                    <label>Check In :</label>
                    <input type="date" value={checkIn} onChange={ev => { const selectedDate = new Date(ev.target.value); setCheckIn(ev.target.value); const nextDay = new Date(selectedDate); nextDay.setDate(selectedDate.getDate() + 1); setCheckOut(nextDay.toISOString().split('T')[0]); }} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div class="py-4 px-4 border-l border-b border-r">
                    <label>Check Out :</label>
                    <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} min={checkIn ? new Date(checkIn) + 1 : undefined} />
                </div>
            </div>
            <div class="py-3">
                <label class="py-4 px-4">Number of Guests :</label>
                <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} min={1} />
            </div>
            {numberOfNights > 0 && (
                <div class="py-3 px-4 border-t">
                    <label>Your Full Name :</label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                    <label>Phone Number :</label>
                    <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} />
                </div>
            )}
        </div>
        <button onClick={bookThisPlace} class="primary mt-4">
            Book This Place
            {numberOfNights > 0 && (<span>${numberOfNights * place.price}</span>)}
        </button>
    </div>
    
    )
}

export default BookingWidget
