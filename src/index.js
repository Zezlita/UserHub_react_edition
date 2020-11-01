import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import {
  Header,
  UserPosts,
  UserTodos
} from './components';

import {
  getUsers,
  getPostsByUser,
  getTodosByUser
} from './api';

//THE DATA FLOW -- Inside our main App component, we initialize a piece of state called userList, and set it equal to an empty array. The App component calls the Header component, passing the userList along.
const App = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    getUsers()
      .then(users => {
        setUserList(users)
      })
      .catch(error => {
        console.error
      });
  }, []);

  //Whenever the value of currentUser changes (via login/logout) we will run this effect. We will either set userPosts to an empty array (if there is no currentUser), or we will make a call to the API and set the userPosts to the return value of that if there is a currentUser.

  //Lastly we use conditional rendering to show the PostList component only if there is a currentUser set.

  useEffect(() => {
    if(!currentUser) {
      setUserPosts([]);
      setUserTodos([]);
      return;
    }
    getPostsByUser(currentUser.id)
      .then(posts => {
        setUserPosts(posts);
      })
      .catch(error => {
        console.error
      });
    getTodosByUser(currentUser.id)
      .then(todos => {
        setUserTodos(todos);
      })
      .catch(error => {
        console.error
      })
  }, [currentUser]);

  //The array of dependencies should be a list of state or props you care about such that, if any of them change, we would rerun the effect function. In this case we gave an empty array which tells useEffect never to re-run the effect function (since it doesn't depend on any prop or state to be run).
  
  return (
    <div id="App">
      <Header 
      userList={userList} 
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      />
      {
      currentUser
      ? <>
      <UserPosts userPosts={userPosts} currentUser={currentUser} />
      <UserTodos userTodos={userTodos} currentUser={currentUser} />
      </>
      : null
        }
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);