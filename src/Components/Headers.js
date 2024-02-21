import React, { Fragment } from 'react'
import './CSS/Navbar.css'

function Navbar() {

  return (
    <Fragment>
        <div className='container'>
               <div className='leftSide'>
                   <ul className='leftul'>
                    <a href="/">Home</a>
                   </ul>
               </div>
        </div>
    </Fragment>
  )
}

export default Navbar