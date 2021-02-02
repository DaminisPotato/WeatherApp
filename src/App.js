import { Redirect, Route, Switch } from 'react-router-dom';
import Clouds from './components/Animation/Clouds/Clouds';
import SunMoon from './components/Animation/SunMoon/SunMoon';
import Dashboard from './containers/Dashboard/Dashboard';


const App = () => {
  let routes = (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/weather" component={Clouds} />
      <Route path="/setting" component={SunMoon} />
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
