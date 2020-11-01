import React, { useEffect, useState } from 'react';
import {getUsers} from './api';
import ReactDOM from 'react-dom';

import {
  Header
} from './components';

//THE DATA FLOW -- Inside our main App component, we initialize a piece of state called userList, and set it equal to an empty array. The App component calls the Header component, passing the userList along.
const App = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUsers()
      .then(users => {
        setUserList(users)
      })
      .catch(error => {
        console.error
      });
  }, []);
  //The array of dependencies should be a list of state or props you care about such that, if any of them change, we would rerun the effect function. In this case we gave an empty array which tells useEffect never to re-run the effect function (since it doesn't depend on any prop or state to be run).
  
  return (
    <div id="App">
      <Header userList={userList} />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);