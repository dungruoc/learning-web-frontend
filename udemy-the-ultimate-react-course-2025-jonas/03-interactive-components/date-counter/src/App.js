import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function handleStepDown() {
    if (step > 0) {
      setStep(st => st - 1);
    }
  }

  return (
    <div className="container">
      <h1>Date Counter</h1>
      <p>
        <span className="btn" onClick={handleStepDown}>-</span>Step: {step}<span className="btn" onClick={() => setStep(st => st + 1)}>+</span>
      </p>
      <p>
        <span className="btn" onClick={() => setCount(c => c - step)}>-</span>Count: {count}<span className="btn" onClick={() => setCount(c => c + step)}>+</span>
      </p>
      <DateInfo dayGap={count} />
    </div>
  );
}

function DateInfo({dayGap}) {
  const date = new Date();
  date.setDate(date.getDate() + dayGap);

  return (
    <p>
      {`${dayGap} days from today is ${date.toDateString()}`}
    </p>
  )
}
