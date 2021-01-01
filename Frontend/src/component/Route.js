// Route ข้อมูล
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Main";
import Cartype from './Cartype';
import About from './About';
import Contact from './Contact';
import Login from './login';
import Register from './Register';
import Cardetail from './Cardetail';
import Carorder from './Carorder';
import Listorder from './Listorder';
import Addcar from './Addcar';
import Editcar from './subcomponenct/editcar';
import Profile from './Profile';
import Configorder from './configorder';
import Editorder from './subcomponenct/editorder';
import Configcar from './configcar';
import Managecar from './Managecar';
export default class Routers extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/cartype" component={Cartype} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/cardetail/:id" component={Cardetail} />
            <Route exact path="/carorder/:id" component={Carorder} />
            <Route exact path="/listorder" component={Listorder} />
            <Route exact path="/addcar" component={Addcar} />
            <Route exact path="/editcar/:id" component={Editcar} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/configorder" component={Configorder} />
            <Route exact path="/editorder/:id" component={Editorder} />
            <Route exact path="/configcar" component={Configcar} />
            <Route exact path="/managecar/:id" component={Managecar} />
            <Route
              render={function () {
                return <h1>Not Found</h1>;
              }}
            />
          </Switch>
        </Router>
      </>
    );
  }
}
