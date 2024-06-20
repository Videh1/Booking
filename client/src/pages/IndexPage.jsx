import { Link } from 'react-router-dom'
import Header from '../Header'
import { useEffect, useState } from 'react'
import axios from "axios"
import Loader from '../Loader'
export default function IndexPage() {

    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('/places').then(response => {
            
            setPlaces([...response.data]);
            setLoading(false)
        })
    }, []);

    if(loading)
        return (<Loader/>)
    
    return (
        <div className="container mx-auto py-8">
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.map(place => (
                <Link key={place._id} to={`/place/${place._id}`} className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg">
                    <div className="h-48 overflow-hidden">
                        {place.photos?.[0] && (
                            <img className="w-full h-full object-cover" src={`http://localhost:4000/${place.photos[0]}`} alt={place.title} />
                        )}
                    </div>
                    <div className="p-4">
                        <h2 className="font-bold text-lg">{place.title}</h2>
                        <h3 className="text-gray-600 text-sm mt-1">{place.address}</h3>
                        <div className="mt-2">
                            <span className="font-bold text-gray-800">${place.price}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
    )
} 