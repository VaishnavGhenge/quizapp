import Home from './Home/Home'
import './App.css'
import Leaderboard from './leaderboard/Leaderboard'
import Question from './Question/Question'
import Dashboard from './Dashboard/Dashboard'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route exact path="/question">
            <Question />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
