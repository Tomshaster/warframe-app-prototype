import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home/Home.js";
import Relicdetails from "./Components/Relicdetails/Relicdetails.js";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Home} />
      <Route path="/details/:relicName" component={Relicdetails} />
    </div>
  );
}

export default App;
