import Weather from "./weather.js";
import DayTime from "./dayTime.js";
function TpBar() {
  return (
    <div className="flex justify-between p-10 ">
      <DayTime></DayTime>
      <Weather></Weather>
    </div>
  );
}

export default TpBar;
