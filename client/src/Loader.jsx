import React from 'react'
import './loader.css'

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
            <div className="lds-dual-ring"></div>
        </div>
    </div>
    


    )
}

export default Loader
