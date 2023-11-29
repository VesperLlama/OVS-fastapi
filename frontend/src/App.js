import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Vote from "./components/Vote";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signout" />
        <Route exact path="/vote" component={Vote} />
        <Route exact path="/signup" component={Register} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
