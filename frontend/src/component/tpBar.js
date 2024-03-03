import Weather from './weather.js'; 
import DayTime from './dayTime';
function TpBar() {
   
    return (
      <div className='flex justify-between'>
        <DayTime></DayTime>
        <Weather></Weather>
      </div>
    );
  }
  
  export default TpBar;
  