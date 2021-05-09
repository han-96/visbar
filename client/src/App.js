import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PageRender from './PageRender';
import Home from './pages/home';
import Login from './pages/login';
import Notify from './components/notify/Notify';
import { useSelector, useDispatch } from 'react-redux';


function App() {
  const { auth } = useSelector(state => state)
  return (
    <Router>
      <Notify />
      <input type="checkbox" id="theme"/>
      <div className="App">
        <div className="main">
          <Route exact path="/" component={Login} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
    
  );
}

export default App;
