import React from "react";
import {Router, Route,Switch,Redirect} from "dva/router";

import Posts from "./routes/posts";
import WrappedForm from "./Components/form";
import WrappedFormEdit from './Components/edit';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
    <div>
      <Switch>
      <Route exact path="/" component={Posts} />
      <Route exact path="/create"  component={WrappedForm}/>
      <Route exact path="/edit"  component={WrappedFormEdit}/>
      </Switch>
    </div> 
    </Router>
  );
}

export default RouterConfig;
