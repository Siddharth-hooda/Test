import React, { useState, useEffect } from "react";
import { useContext } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Home = () => {
  const [users, setUser] = useState([]);
  const userContext = useContext(UserContext)
  const userList = userContext.userList
 

  const deleteUser = id => {
   const newUserList = [...userList]
   newUserList.splice(id,1  )
   console.log(newUserList)
   userContext.setUserList(newUserList)
  };

  
  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${index}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteUser(index)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
