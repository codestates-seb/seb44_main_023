import WeatherWidget from "../components/WeatherWidget/WeatherWidget"
const TestWidget = () => {

return(
<div>
      <h1>Weather Widget Example</h1>

      <div>
        <h2>Normal Size</h2>
        <WeatherWidget />
      </div>

      <div>
        <h2>70% Scale</h2>
        <WeatherWidget scale={0.7} />
      </div>
    </div>);

}
export default TestWidget;
 