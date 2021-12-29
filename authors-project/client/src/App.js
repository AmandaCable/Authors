
import Dashboard from './views/Dashboard'
import Create from './views/Create'
import Edit from './views/Edit'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/new">
            <Create />
          </Route>
          <Route exact path="/authors/edit/:id">
            <Edit />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
