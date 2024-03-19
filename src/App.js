import "./styles.css";
import WheelForm from "./components/WheelForm";

export default function App()
{
    return (
      <div className="App">
        <h1>Totally random wheel</h1>
        <div>
          <WheelForm/>
        </div>
        <div>
          <h2>Da Rules:</h2>
          <p>#yolo</p>
        </div>
      </div>
    );
}