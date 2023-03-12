import Home from './Home/Home'
import './App.css'
import Leaderboard from './Leaderboard/Leaderboard'
import Question from './Question/Question'
import Dashboard from './Dashboard/Dashboard'
import CreateQuiz from './CreateQuiz/CreateQuiz'

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

          
          <Route exact path="/leaderboard">
            <Leaderboard />
          </Route>

          <Route exact path="/dashboard">
            <Dashboard />
          </Route>

          <Route exact path="/create-quiz">
            <CreateQuiz />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
