import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';

import {
    storeCurrentUser,
    cleanCurrentUser,
    clearCurrentUser
} from '../auth';

import './header.css';

const Header = ({
    currentUser,
    setCurrentUser,
    userList
    }) => {
    const [selectedUser, setSelectedUser] = useState();
    // First we create a piece of local state for our form. Then, we create an effect that depends on the value of userList. This effect will run when the component is created, and will re-run when our App finishes its own effect.

    //That second time will set the default selectedUser to the first one in our dropdown.
    useEffect (() => {
        setSelectedUser(userList[0]);
    }, [userList]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const handleSelectChange = (event) => {
        const id = event.target.value;
        const user = userList.find(user => user.id == id);
        setSelectedUser(user);
    }

    //Lastly, depending on if a user is logging in or logging out we update the value of currentUser by calling setCurrentUser either on selectedUser or null.

    //If you use the log in and log out features you should see that we can, in fact, update the value of currentUser and that the form updates accordingly.

    const handleUserLogin = (event) => {
        storeCurrentUser(selectedUser);
        setCurrentUser(selectedUser);
    }

    const handleUserLogout = (event) => {
        setSelectedUser(userList[0]);
        clearCurrentUser();
        setCurrentUser(null);
    }
//NAVLink = is the two buttons navigating to different tabs, activeClassName is what we use to style in CSS ".user-select a"
    return (
        <header>
            <h1>Welcome to UserHub</h1>
            <form
                className = "user-select"
                onSubmit={handleSubmit}> 
                {
                    currentUser 
                    ? <>
                        <NavLink to="/posts" activeClassName="current">POSTS</NavLink>
                        <NavLink to="/todos" activeClassName="current">TODOS</NavLink>
                        <button onClick={ handleUserLogout }>LOG OUT, {currentUser.username}</button>
                    </>
                    : <>
                    <select onChange={ handleSelectChange } > {
                    userList.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))
            }</select>
            <button onClick={handleUserLogin} >LOG IN</button>
            </>
            }
            </form>
        </header>
    );
}

export default Header;