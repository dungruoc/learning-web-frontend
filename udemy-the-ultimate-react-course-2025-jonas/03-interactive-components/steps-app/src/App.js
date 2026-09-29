import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑"
]

export default function App() {
  const [currentStep, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handePreviousBtn() {
    if (currentStep > 1)
      setStep(s => s - 1);
  }

  function handeNextBtn() {
    if (currentStep < 3)
      setStep(s => s + 1);
  }

  function handleCloseBtn() {
    setIsOpen(o => !o);
  }

  return (
    <>
    <div onClick={handleCloseBtn} className="close">&times;</div>
    <div className="steps" style={isOpen ? null : {display: 'none'}}>
      <div className="numbers">
        {[1, 2, 3].map(step => <Step currentStep={currentStep} step={step} key={step} />)}
      </div>
      <div className="message">Step {currentStep}: {messages.at(currentStep - 1)}</div>
      <div className="buttons">
        <button onClick={handePreviousBtn}>Previous</button>
        <button onClick={handeNextBtn}>Next</button>
      </div>
    </div>
    </>
  );
}

function Step({currentStep, step}) {
  return <div className={currentStep >= step ? "active" : ""}>{step}</div>;
}
