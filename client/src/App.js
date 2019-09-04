import React from "react";
import "./assets/styles/style.sass";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sound from "./components/Sound";
import Login from "./components/Login";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

// const DataContext = React.createContext({});

const sounds = [
  {
    id: "applause",
    title: "Applause",
  },
  {
    id: "badum-ts",
    title: "Badum-Tss",
  },
  {
    id: "chicken",
    title: "Chicken",
  },
  {
    id: "crowd-groan",
    title: "Crowd groan",
  },
  {
    id: "da-da-da-net",
    title: "Da? da? da? Net!",
  },
  {
    id: "echo-slamma-jamma",
    title: "Echo slamma jamma",
  },
  {
    id: "hahaha",
    title: "Ha-ha-ha",
  },
  {
    id: "head-bonk",
    title: "Head bonk",
  },
  {
    id: "lakad-matatag",
    title: "Lakad Matataaag!",
  },
  {
    id: "monkey",
    title: "Monkey business",
  },
  {
    id: "mosquito",
    title: "Mosquito buzz",
  },
  {
    id: "next-level-play",
    title: "The next level play",
  },
  {
    id: "oh-my-lord",
    title: "Oh my Lord!",
  },
  {
    id: "orangutan-kiss",
    title: "Orangutan kiss",
  },
  {
    id: "oyoyoy",
    title: "Oyoy oy oy, oy, oy, oy, oy, oy!",
  },
  {
    id: "roshan",
    title: "Roshan! Roshan! Roshan!",
  },
  {
    id: "scan",
    title: "We need to scan! Dararandaradarararan",
  },
  {
    id: "snore",
    title: "Snore",
  },
  {
    id: "waow",
    title: "Waow!",
  },
  {
    id: "whats-cooking",
    title: "You know whats cooking? BOOM!",
  },
];

function Main() {
  return (
    <div className="container">
      <h1 className="welcome-title">loneicybot</h1>
      <PerfectScrollbar className="content">
        {sounds.map((el, i) => (
          <Sound key={el.id} id={el.id} title={el.title} />
        ))}
      </PerfectScrollbar>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
