import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./routes/home";
import Profile from "./routes/profile";

const Container = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/p/:id" component={Profile} />
    </div>
  </Router>
);

ReactDOM.render(<Container />, document.getElementById("root"));
