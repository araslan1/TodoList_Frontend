import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signup from "./Signup"
import Home from './Home'
import TaskPage from './TaskPage'
import AuthenticatedUserProfile from './AuthenticatedUserProfile'
import Login from './Login'

function App() {
  return (
    <Router>
      <div className="App">
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route path="/signup"><Signup /></Route>
              <Route path="/taskpage"><TaskPage /></Route>
              <Route path="/signup"><Signup /></Route>
              <Route path="/AuthenticatedUserProfile"><AuthenticatedUserProfile /></Route>
              <Route path="/login"><Login /></Route>
            </Switch>
      </div>
    </Router>
  );
}

export default App;
