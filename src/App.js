import React, { useEffect, useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Navbar from "./components/layout/Navbar";
import axios from "axios";
import Landing from "./Landing";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import User from "./components/users/User";
import { createContext } from "react";
export const UserContext = createContext({
  userList: [],
  setUserList: () => { },
  isLoggedIn: false,
  setLoggedIn: () => { }
})
function App(props) {
  const [userList, setUserList] = useState([])
  useEffect(() => {
    if (userList.length == 0) {
      axios({
        url: "https://reqres.in/api/users?page=1",
        method: "GET"
      }).then(res => {
        setUserList(res.data.data)
      }).catch(e => console.log(e))
    }
  }

    , [])
  const [logStatus, setLogStatus] = useState(false)
  return (
    <UserContext.Provider value={{
      userList: userList,
      setUserList: setUserList,
      isLoggedIn: logStatus, setLoggedIn: setLogStatus
    }}>
      <Router>
        <div className="App">

          {logStatus ? (
            <><Navbar />

              <Switch>


                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/users/add" component={AddUser} />
                <Route exact path="/users/edit/:id" component={EditUser} />
                <Route exact path="/users/:id" component={User} />
                {/* <Route component={NotFound} /> */}
                </Switch>
              </>) :
              (<>
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/login' component={Login} />
                </Switch>
              </>)
            }
            {/* </Switch> */}
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
