import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signup from "./Signup"
import Home from './Home'
import TaskPage from './TaskPage'

function App() {
  return (
    <Router>
      <div className="App">
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route path="/signup"><Signup /></Route>
              <Route path="/taskpage"><TaskPage /></Route>
            </Switch>
      </div>
    </Router>
  );
}

export default App;
