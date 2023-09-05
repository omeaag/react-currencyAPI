import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Currency() {
  const [Dollar, setDollar] = useState(0);
  const [number, setNumber] = useState(0);
  const [rate, setRate] = useState({ TRY: 0 });
  const [key, setKey] = useState([]);

  const [selectedOption, setSelectedOption] = useState("TRY");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNumberChange = (event) => {
    const inputNumber = event.target.value;
    setNumber(inputNumber);
  };

  function getAxios() {
    axios
      .get("https://open.er-api.com/v6/latest/USD")
      .then((response) => {
        const tryRate = response.data.rates;
        setRate(tryRate);
        setKey(Object.keys(response.data.rates));
        console.log(Object.keys(response.data.rates));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => getAxios(), [Dollar]);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={handleNumberChange}
        placeholder="Enter a number"
      />

      <h1> your money is ${Dollar}</h1>

      <button
        onClick={() => {
          setDollar(Dollar - number);
          setNumber(0);
        }}
      >
        withdraw
      </button>

      <button
        onClick={() => {
          setDollar(Number(Dollar) + Number(number));
          setNumber(0);
        }}
      >
        deposit
      </button>
      <button
        onClick={() => {
          setDollar(0);
          setNumber(0);
        }}
      >
        reset
      </button>
      <button onClick={() => getAxios()}>refresh</button>
      <h1>Select Box Example</h1>

      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select an option</option>

        {key.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
      <h1>
        {" "}
        your money is {Dollar * rate[selectedOption]}
        {selectedOption}
      </h1>
    </div>
  );
}
export default Currency;
