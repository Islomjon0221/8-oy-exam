import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='w-[60%] mx-auto h-screen bg-[#121212] text-white'>
        <div className='pt-[37%] w-[40%] mx-auto'>
            <h1 className='text-[74px] text-center'>Error 404</h1>
            <h3 className='text-center mb-8 mt-2 text-xl'>Page not found</h3>
            <Link className='text-center ml-[26%] bg-black transition-all duration-300 px-16 py-2 hover:bg-[#303030]' to = "/">Home</Link>
        </div>
    </div>
  )
}

export default ErrorPage