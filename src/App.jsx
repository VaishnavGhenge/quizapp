import Home from './Components/Home/Home'
import './App.css'
import Leaderboard from './Components/Leaderboard/Leaderboard'
import Question from './Components/Question/Question'
import Dashboard from './Components/Dashboard/Dashboard'
import CreateQuiz from './Components/CreateQuiz/CreateQuiz'
import Signup from './Components/Signup/Signup'
import QuizDetails from './Components/CreateQuiz/QuizDetails'
import VerifyEmail from './Components/VerifyEmail/VerifyEmail'
import CheckEmailToken from './Components/VerifyEmail/CheckEmailToken'

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

          <Route exact path="/create/quiz/:quizId">
            <CreateQuiz />
          </Route>

          <Route exact path="/create/quiz">
            <QuizDetails />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>

          <Route exact path="/verify-email">
            <VerifyEmail />
          </Route>

          <Route exact path="/verify-email/:code">
            <CheckEmailToken />
          </Route>

        </Switch>
      </Router>
    </div>
  )
}

export default App
