import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';


const App = () => {
  let routes = (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" exact component={Dashboard} />
      <Redirect to='/' />
    </Switch>
  )
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
