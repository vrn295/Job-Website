import './App.scss';
import Navbar from "./component/Navbar"
import Home from "./component/Home"
import SignUp from "./component/SignUp"
import Login from "./component/Login"
import ForgetPassword from "./component/ForgetPassword"
import PostedJob from "./component/PostedJob"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import PostNewJob from './component/PostedJob/PostNewJob';
import { useState } from 'react';
import { isLogin } from './component/utils';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isLogin())
  toast.configure({
    position: toast.POSITION.BOTTOM_RIGHT,
    hideProgressBar: true,
    autoClose: 3000,
});
  return (
    <div className="App">
      <Router>
        <Navbar 
          isLoggedIn={isLoggedIn} 
          setLoginFalse={() => setIsLoggedIn(false)}
         />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sign-up" exact>
              <SignUp 
                setLoginTrue={() => setIsLoggedIn(true)}
              />
            </Route>
            <Route path="/login" exact>
              <Login 
                setLoginTrue={() => setIsLoggedIn(true)}
              />
            </Route>
            <Route path="/forget-password" exact component={ForgetPassword} />
            <PrivateRoute path="/posted-job" exact component={PostedJob} />
            <PrivateRoute  path="/page"  component={SignUp}  exact  />
            <PrivateRoute  path="/post-new-job"  component={PostNewJob}  exact  />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
