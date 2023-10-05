import Layout from "./Layout";
import Home from './pages/Home'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
      </Switch>
    </Router>
  )
}

export default App
