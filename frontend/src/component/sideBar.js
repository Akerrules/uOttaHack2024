import React from 'react';
import Link from 'next/link'; 
import './sideBar.css'; 

function Sidebar() {
  return (
    <div className="p-8">
      <ul>
        <li className='text p-6 font-semibold'><Link href="/">HOME</Link></li>
        <li className='text p-6 font-semibold '><Link href="/">ROUTES</Link></li>
        <li className='text p-6 font-semibold'><Link href="/charging">CHARGING</Link></li>
        <li className='text p-6 font-semibold '><Link href="/">ENTERTAINMENT</Link></li>
        <li className='text p-6 font-semibold '><Link href="/">HISTORIC VIEW</Link></li>
      </ul>
      
    </div>
  );
}

export default Sidebar;