import { useState } from "react";
import "./App.css";

function App() {
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [result, setResult] = useState();
  const [errors, setError] = useState();
  const [operator, setOperator] = useState("+");

  // calculate over operator
  const calculate = () => {
    switch (operator) {
      case "+":
        addValues();
        break;
      case "-":
        subtractValues();
        break;
      case "*":
        multiplyValues();
        break;
      case "/":
        divisionValues();
        break;
    }
  };

  // sum two numbers
  const addValues = () => {
    const isValidNumber = isValidNumbers();
    if (isValidNumber) {
      setResult(number1 + number2);
    }
  };

  // subtract two numbers
  const subtractValues = () => {
    const isValidNumber = isValidNumbers();
    if (isValidNumber) {
      if (number1 < number2) {
        setError({ number1: "number1 must be greater" });
      } else {
        let value = number1 - number2;

        setResult(Number.isInteger(value) ? value : value.toFixed(2));
      }
    }
  };

  // multiply two numbers
  const multiplyValues = () => {
    const isValidNumber = isValidNumbers();
    if (isValidNumber) {
      setResult(number1 * number2);
    }
  };

  // divide two numbers
  const divisionValues = () => {
    const isValidNumber = isValidNumbers();
    if (isValidNumber) {
      if (number2 === 0) {
        setError({ number2: "number2 must not be 0" });
      } else {
        setResult((number1 / number2).toFixed(2));
      }
    }
  };

  // check empty and invalid numbers
  function isValidNumbers() {
    let errors = {};
    setResult();

    if (!number1 && number1 != 0) {
      errors["number1"] = "number1 is required";
    }

    if (!number2 && number2 != 0) {
      errors["number2"] = "number2 is required";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return false;
    }

    setError();
    return true;
  }

  // assign operator
  const chooseOperator = (e) => {
    setOperator(e.target.value);
  };

  return (
    <div className="App">
      <div className="card">
        <h3 className="text">Calculator</h3>

        {/* number 1 input field */}
        <div className="input-group">
          <label htmlFor="number1" className="label">
            Number1
          </label>
          <input
            type="number"
            id="number1"
            className="input"
            placeholder="Enter number 1 value"
            onKeyDown={(event) => {
              if (!/^\d*\.?\d*$/.test(event.key) && event.key !== "Backspace") {
                event.preventDefault();
              }
            }}
            onChange={(e) => setNumber1(parseFloat(e.target.value))}
          />
          <span className="error">{errors?.number1}</span>
        </div>

        {/* number 2 input field */}
        <div className="input-group">
          <label htmlFor="number1" className="label">
            Number2
          </label>
          <input
            type="number"
            id="number2"
            inputMode="numeric"
            className="input"
            placeholder="Enter number 2 value"
            onKeyDown={(event) => {
              if (!/^\d*\.?\d*$/.test(event.key) && event.key !== "Backspace") {
                event.preventDefault();
              }
            }}
            onChange={(e) => setNumber2(parseFloat(e.target.value))}
          />
          <span className="error">{errors?.number2}</span>
        </div>

        {/* operator select field */}
        <div className="select-group">
          <label htmlFor="number1" className="label">
            Operator
          </label>
          <select onChange={chooseOperator}>
            <option className="option" value="+">
              sum(+)
            </option>
            <option value="-">subtract(-)</option>
            <option value="*">multiply(x)</option>
            <option value="/">divide(÷)</option>
          </select>
        </div>

        <button className="btn" type="submit" onClick={calculate}>
          Submit
        </button>
        <h5 className="text">Your result is: {result}</h5>
      </div>
    </div>
  );
}

export default App;
