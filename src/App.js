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
          <p>1. The probabilities should add up to 1.</p>
          <p>2. A probability should be in the range of 0-1.</p>
          <p>3. The probability number should be up to 2 numbers after the decimal point (for example: 0.45).</p>
        </div>
      </div>
    );
}