import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signup from "./Signup"
import Home from './Home'
import Createaccount from './Createaccount'

function App() {
  return (
    <Router>
      <div className="App">
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route path="/signup"><Signup /></Route>
              <Route path="/createaccount"><Createaccount /></Route>
            </Switch>
      </div>
    </Router>
  );
}

export default App;
