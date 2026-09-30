import { useState } from "react";

const stepData = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑"
]

export default function App() {
  const [currentStep, setStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  function handePreviousBtn() {
    if (currentStep > 0)
      setStep(s => s - 1);
  }

  function handeNextBtn() {
    if (currentStep < stepData.length - 1)
      setStep(s => s + 1);
  }

  function handleCloseBtn() {
    setIsOpen(o => !o);
  }

  return (
    <>
    <div onClick={handleCloseBtn} className="close">{isOpen ? <span>&times;</span> : <span>+</span>}</div>
    {isOpen ?
    <div className="steps">
      <div className="numbers">
        {stepData.map((_, idx) => <Step onChooseStep={setStep} currentStep={currentStep} step={idx} key={idx} />)}
      </div>
      <StepMessage step={currentStep}>
        <h3 style={{backgroundColor: '#7950f2', color: '#fff', padding: '4px 8px', borderRadius: '8px'}}>Step {currentStep + 1}</h3>
        {stepData.at(currentStep)}
      </StepMessage>
      <div className="buttons">
        <Button onClick={handePreviousBtn}>👈 Previous</Button>
        <Button onClick={handeNextBtn}>Next 👉</Button>
      </div>
    </div>
    : null }
    </>
  );
}

function Step({currentStep, step, onChooseStep}) {
  return <div onClick={() => onChooseStep(step)} className={currentStep >= step ? "active" : ""}>{step + 1}</div>;
}

function StepMessage({step, children}) {
  return (
    <div className="message">
      {children}
    </div>)
}

function Button({onClick, children}) {
  return <button onClick={onClick}>{children}</button>
}