import '../scss/App.scss';
import { Start } from '../components/Start';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import { Questions } from '../components/Questions';
import { FinalScore } from '../components/FinalScore';



export function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/questions/score" component={FinalScore}></Route>
          <Route path="/questions" component={Questions}></Route>
          <Route path="/" component={Start}></Route>
        </Switch>
      </div>




    </Router>
  );
}
