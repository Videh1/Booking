import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import BookingWidget from '../BookingWidget';
import Loader from '../Loader';

const PlacePage = () => {
    const { id } = useParams();

    const [place, setPlace] = useState(null);
    const [loader, setLoader] = useState(true);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
            setLoader(false);
        });
    }, [id]);

    if (!place) return "";
    if(loader)
        {
            return <Loader/>
        }

    if (showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-black text-white min-h-screen'>
                <div className='bg-black p-8'>
                    <div>
                        <h2 className='text-3xl mr-48'>Photos of {place.title}</h2>
                        <button onClick={() => { setShowAllPhotos(false) }} className='fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow-black bg-white text-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Close Photos
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {
                            place?.photos?.length > 0 && place.photos.map(photo => (
                                <img src={'http://localhost:4000/' + photo} alt="" style={{ maxWidth: '200px', height: 'auto', width: '100%' }} />
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8'>
            <h1 className='text-3xl font-semibold'>{place.title}</h1>
            <a className="flex items-center gap-1 my-3 text-blue-500" target="_blank" href={'https://maps.google.com/?q=' + place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"></path>
                </svg>
                {place.address}
            </a>

            <div className='relative'>
                <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-3xl overflow-hidden '>
                    <div>
                        {
                            place.photos?.[0] && (
                                <div>
                                    <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer object-cover w-full h-64" src={'http://localhost:4000/' + place.photos[0]} alt={""} />
                                </div>
                            )
                        }
                    </div>
                    <div>
                        {
                            place.photos?.[1] && (
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer object-cover w-full h-64" src={'http://localhost:4000/' + place.photos[1]} alt={""} />
                            )
                        }
                    </div>
                    <div className='overflow-hidden'>
                        {
                            place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer object-cover w-full h-64 " src={'http://localhost:4000/' + place.photos[2]} alt={""} />
                            )
                        }
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className='flex items-center gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md text-gray-800'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    Show More Photos
                </button>
            </div>

            <div className='mt-8 mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2'>
                <div>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        <p className="text-gray-700">{place.description}</p>
                    </div>
                    <p>Check-in : {place.checkIn} </p>
                    <p>Check-out : {place.checkOut} </p>
                    <p>Max Number of Guests : {place.maxGuests}</p>
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className='font-semibold text-2xl'>Extra Information</h2>
                </div>
                <p className='mb-4 mt-2 text-sm text-gray-700 leading-7'>{place.extraInfo}</p>
            </div>
        </div>

    )
}

export default PlacePage
