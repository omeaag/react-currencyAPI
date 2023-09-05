import "./App.css";
import { useEffect, useState } from "react";
import Currency from "./Currency";

function App() {
  const [age, setAge] = useState(0);
  const increament = () => setAge(age + 1);
  const decrement = () => setAge(age - 1);

  useEffect(() => {
    console.log(`age chanced ${age}`);
  }, [age]);

  return (
    <div>
      <Currency />
    </div>
  );
}

export default App;
