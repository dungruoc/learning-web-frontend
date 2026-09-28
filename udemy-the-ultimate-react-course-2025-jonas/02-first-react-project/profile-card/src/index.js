import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { skills } from "./skill-data";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
    return (
        <img className="avatar" src="./jonas.jpeg" alt="Jonas" />
    );
}

function Intro() {
    return (
        <div>
            <h1>Jonas Schmedtmann</h1>
            <p>
                Full-stack web developer and teacher at Udemy.
                When not coding or preparing a course, I like to play board games,
                to cook (and eat), or to just enjoy the Portuguese sun at the beach.
            </p>
        </div>
    );
}

function SkillList() {
    return (
        <div className="skill-list">
          {skills.map((skill, idx) => <Skill data={skill} key={idx}/>)}
        </div>
    );
}

function Skill({data}) {
  const level_emoji = new Map([
    ["advanced", "👨‍🏫"],
    ["intermediate", "🧑‍🎓"],
    ["beginner", "👶"]
  ]);

  return (
    <div className="skill" style={{ backgroundColor: data.color }}>
      <span>{data.skill}</span>
      <span>{level_emoji.get(data.level)}</span>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
