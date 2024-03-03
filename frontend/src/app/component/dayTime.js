// pages/index.js
import React, { useState, useEffect } from 'react';

function DayTime() {
  // Initialize state for current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Function to update current time
  const updateCurrentTime = () => {
    setCurrentTime(new Date());
  };

  // Set up interval to update time every second
  useEffect(() => {
    const interval = setInterval(updateCurrentTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures effect runs only once on mount

  // Format the date
  const formattedDate = currentTime.toDateString();

  // Format the time
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div className=''>
      <h1 className='font-bold'>{formattedTime}</h1>
      <h1 className='font-normal'>{formattedDate}</h1>
    </div>
  );
}

export default DayTime;
