import './App.css';
import Page from "./components/Page";
import Home from "./components/screens/Home";
import Swap from "./components/screens/Swap";
import TodoList from "./components/screens/TodoList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route
            exact
            path="/"
            render={() => (
              // <>
              // </>
              <Page>
                <Home />
              </Page>
            )}
          />
          <Route
           exact
           path="/todo-list"
           render={() => (
             <Page>
               <TodoList />
             </Page>
           )}
         />
           <Route
            exact
            path="/swap"
            render={() => (
              <Page>
                <Swap />
              </Page>
            )}
          />
      </Switch>
    </Router>
  );
}

export default App;
