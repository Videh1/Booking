import { Link, useParams } from "react-router-dom"
import AccountNav from "./AccountNav";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import PlaceImg from "../PlaceImg";
import Loader from "../Loader";



export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        axios.get('/places').then(({ data }) => {
            setPlaces(data);
            setLoader(false);
        })
    }, []);

    if(loader)
        {
            return (<Loader/>)
        }
    return (
        <div className="bg-gray-100 min-h-screen">
            <AccountNav />
            <div className="container mx-auto py-8">
                <div className="flex justify-center mb-4">
                    <Link className="bg-primary text-white py-2 px-6 rounded-full flex items-center" to="/account/places/new">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Add New Place
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {places.map(place => (
                        <Link key={place._id} to={`/account/places/${place._id}`} className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-lg">
                            <div className="h-40 overflow-hidden">
                                <PlaceImg place={place} />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{place.title}</h2>
                                <p className="text-gray-600">{place.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}