import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import { usePathname } from 'next/navigation'; // Importing usePathname
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { faChargingStation } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const pathname = usePathname(); // Using usePathname

  const [activeRoute, setActiveRoute] = useState('');

  // Function to determine if a link is active
  // Function to determine if a link is active
const isActiveLink = (href) => {
  if (href === '/') {
    return pathname === '/';
  }

  const keywordIndex = href.indexOf('/');
  const firstSlashIndex = href.indexOf('/', keywordIndex + 1); // Find the index of the first '/' after the keyword
  const pathToCheck = firstSlashIndex === -1 ? href : href.substring(0, firstSlashIndex); // Extract the path to check
  
  return pathname.startsWith(pathToCheck); // Check if the current pathname starts with the extracted path
};

  

  // Function to update the active route
  const updateActiveRoute = () => {
    setActiveRoute(pathname);
  };

  // Update active route on component mount and pathname changes
  useEffect(() => {
    updateActiveRoute(); // Update on mount
    return () => {
      // Cleanup on unmount
    };
  }, [pathname]); // Update on pathname change

  // Function to render link content based on active state
  const renderLinkContent = (icon, text, href) => {
    if (pathname === '/') {
      return (
        <Link href={href}>
          <p className={`text-3xl p-6 font-semibold ${isActiveLink(href) ? 'text-blue-500' : 'text-gray-500'} transition-transform duration-300 hover:-translate-y-1`}>
            <FontAwesomeIcon icon={icon} />
            <span className="ml-2">{text}</span>
          </p>
        </Link>
      );
    } else {
      return (
        <Link href={href}>
          <p className={`text-3xl p-6 font-semibold ${isActiveLink(href) ? 'text-blue-500' : 'text-gray-500'} transition-transform duration-300 hover:-translate-y-1 `}>
            <FontAwesomeIcon icon={icon} />
          </p>
        </Link>
      );
    }
  };

  const isHomeRoute = () => {
    return pathname === '/';
  };


  // Render the "Start Trip" button only if the current path is "/"
  // const renderStartTripButton = () => {
  //   if (pathname === '/') {
  //     return (
  //       <Link href="/trip">
  //         <button className="text-gray-500 text-2xl mt-6 inline-block border-6 border-white font-semibold py-2 px-4 ml-6 rounded-lg hover:bg-white ">
  //           START TRIP »
  //         </button>
  //       </Link>
  //     );
  //   }
  //   return null;
  // };

  return (
    <div className={`rounded-lg w-auto ${isHomeRoute() ? 'ml-10' : ''}`}>
      <ul>
        <li>{renderLinkContent(faHouse, 'HOME', '/')}</li>
        <li>{renderLinkContent(faRoute, 'ROUTES', '/trip')}</li>
        <li>{renderLinkContent(faChargingStation, 'CHARGING', '/charging')}</li>
        <li>{renderLinkContent(faMusic, 'ENTERTAINMENT', '/entertainment')}</li>
        <li>{renderLinkContent(faBars, 'HISTORIC VIEW', '/historic-view')}</li>
      </ul>

      {/* {renderStartTripButton()} */}
    </div>
  );
}

export default Sidebar;
