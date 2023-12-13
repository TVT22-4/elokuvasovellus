import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtToken, userInfo } from './Signals';
import { FetchUserData } from './FetchUserData';
import { useParams } from 'react-router-dom';

function UserData() {
    const username = jwtToken.value.username;
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await FetchUserData(username);
        userInfo.value = userData;
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchData();
  }, [username, isDeleted]);

  const handleDeleteUser = async () => {
    try {
        const token = jwtToken.value;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        await axios.delete(`http://localhost:3001/user/${username}`, config);
        setIsDeleted(true); // Set the flag to trigger a re-fetch after deletion
        jwtToken.value = ''; // Clear token after deletion
        console.log('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error.message);
    }
};


  return (
    <div>
      {userInfo.value === null ? (
        <h2>No authorized personal data</h2>
      ) : (
        <div>
          <p>Username: {userInfo.value[0].username}</p>
          <p>First Name: {userInfo.value[0].fname}</p>
          <p>Last Name: {userInfo.value[0].lname}</p>
          <p>Email: {userInfo.value[0].email}</p>
          <button onClick={() => (jwtToken.value = '')}>Logout</button>
          <button onClick={handleDeleteUser}>Delete User</button>
        </div>
      )}
    </div>
  );
}

export { UserData };
