import { useState } from "react";

const contents = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed contents={contents} />
    </div>
  );
}

function Tabbed({contents}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        {Array.from({length: contents.length + 1}, (_, idx) =>
          <Tab tabNumber={idx} key={idx} active={idx === activeTab}
            onSelectTab={setActiveTab}/>)}
      </div>
      {contents.length > 0 && activeTab < contents.length && <TabContent key={contents.at(activeTab).summary} content={contents.at(activeTab)} /> }
      {activeTab >= contents.length && <DifferentContent /> }
    </div>
  )
}

function Tab({tabNumber, active, onSelectTab}) {
  return (
    <button className={active ? 'tab active' : 'tab'}
      onClick={() => onSelectTab(tabNumber)}>
      Tab {tabNumber + 1}
    </button>
  )
}

function TabContent({content}) {

  const [hiddenDetails, setHiddenDetails] = useState(false);
  const [likes, setLikes] = useState(0);

  console.log("RENDER", likes);

  function handleIncrLikes() {
    setLikes(l => l + 1);
    console.log(likes);
  }

  function handleSuperLikes() {
    setLikes( l => l + 3);
  }

  function undoHandl() {
    setLikes(0);
    setHiddenDetails(false);
    console.log(likes);
  }

  function asyncUndoHdl() {
    setTimeout(undoHandl, 2000);
  }

  return (
    <div className="tab-content">
      <h4>{content.summary}</h4>
      {!hiddenDetails && <p>{content.details}</p>}
      <div className="tab-actions">
        <button onClick={() => setHiddenDetails(h => !h)}>{hiddenDetails ? "Show" : "Hide"} details</button>
        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleIncrLikes}>+</button>
          <button onClick={handleSuperLikes}>+++</button>
        </div>
      </div>
      <div className="tab-undo">
        <button onClick={undoHandl}>Undo</button>
        <button onClick={asyncUndoHdl}>Undo in 2s</button>
      </div>
    </div>
  )
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}