import React from 'react'

const PlaceImg = (place,index,className) => {
    console.log("Place is :",place?.place?.photos[0])
    if(!place.place?.photos?.length)
    {
        return "";
    }
    if(!className)
    {
        className = 'object-cover'
    } 
  return (  
   <div className='h-48 overflow-hidden'>
    <img 
        className={className}
        src={`http://localhost:4000/${place?.place?.photos?.[0]}`}
        alt='bookings'
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
</div>


        
  )
}

export default PlaceImg
