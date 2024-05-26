import React, { useState } from 'react';
import add from '../utils/calculator';

const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleCalculate = () => {
    try {
      const sum = add(`${input}`);
      setResult(sum);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={input} 
        onChange={handleChange} 
        aria-label="numbers-input"
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <p aria-label="sum-result">Sum: {result}</p>}
      {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default StringCalculator;
