import React from 'react'
import Link from 'next/link'
import {FaFacebook, FaInstagram, FaSnapchat, FaDumbbell} from "react-icons/fa" //fa stands for font awesome icons which are being used here. npm i react-icons was run in the terminal to install the package containing these icons
import Gym from './Gym'


//div tag inside nav tag so that the introductory statement with my name will be just as wide as the article that we will write in this blog post. This will be done by giving the same classnames to this div tag and the tag in which the content will be

// white/90 means 90% text opacity
export default function Navbar() {
  return (
    <nav className='bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10'>

        <div className='md:px-6 prose prose-xl mx-auto flex justify-between flex-col sm:flex-row'> 
        
        <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">

        <Link href="/" className='text-white/90  no-underline hover:text-black'> 

        Tapish Rathee

        </Link>

        </h1>
        <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
                    <Link className="text-white/90 hover:text-white" href="https://www.facebook.com/tapish.rathee">
                        <FaFacebook />
                    </Link>
                    <Link className="text-white/90 hover:text-white" href="https://www.instagram.com/tapish77?igsh=MXU5aWh1bTkwM2Npcw==">
                        <FaInstagram />
                    </Link>
                    <Link className="text-white/90 hover:text-white" href="https://www.snapchat.com/add/tapishrathee?share_id=iAGi3ezStLc&locale=en-IN">
                        <FaSnapchat />
                    </Link>  
                </div>
            
        </div> 
    </nav>
  )
}
