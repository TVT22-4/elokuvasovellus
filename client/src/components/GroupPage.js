import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function GroupPage() {
  const { idGroup } = useParams();
  const [joinRequests, setJoinRequests] = useState([]);
  const [groupUsers, setGroupUsers] = useState([]);
  const [isCurrentUserOwner, setIsCurrentUserOwner] = useState(false);
  const [isCurrentUserMember, setIsCurrentUserMember] = useState(false);

  useEffect(() => {
    fetchJoinRequests();
    fetchGroupUsers();
    checkIfUserIsOwner();
    checkIfUserIsMember();
  }, [idGroup]);

  const fetchJoinRequests = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`http://localhost:3001/group/group/${idGroup}/users/requests`, config);
      const uniqueUserRequests = Array.from(new Set(response.data.map(request => request.username)))
        .map(username => response.data.find(request => request.username === username));

      setJoinRequests(uniqueUserRequests);
    } catch (error) {
      console.error('Error fetching join requests:', error.message);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`http://localhost:3001/group/group/${idGroup}/users/requests/${requestId}`, null, config);

      setJoinRequests((prevJoinRequests) =>
        prevJoinRequests.filter((request) => request.id !== requestId)
      );
    } catch (error) {
      console.error('Error accepting join request:', error);
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:3001/group/group/${idGroup}/users/requests/${requestId}`, config);
      fetchJoinRequests();
    } catch (error) {
      console.error('Error deleting join request:', error.message);
    }
  };

  const fetchGroupUsers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`http://localhost:3001/group/group/${idGroup}/users`, config);
      setGroupUsers(response.data);
    } catch (error) {
      console.error('Error fetching group users:', error.message);
    }
  };

  const handleDeleteUser = async (username) => {
    try {
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:3001/group/group/${idGroup}/users/${username}`, config);
      fetchGroupUsers();
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const checkIfUserIsOwner = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`http://localhost:3001/group/group/${idGroup}/checkOwner`, config);

      setIsCurrentUserOwner(response.data.isOwner);
    } catch (error) {
      console.error('Error checking group ownership:', error.message);
    }
  };

  const checkIfUserIsMember = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`http://localhost:3001/group/group/${idGroup}/checkMember`, config);
      setIsCurrentUserMember(response.data.isMember);
    } catch (error) {
      console.error('Error checking group membership:', error.message);
    }
  };

  return (
    <body>
    <div>
      {!isCurrentUserMember && (
        <h2>You are not authorized for this page. Please join the group to access its content.</h2>
      )}
      {isCurrentUserMember && (
        <h1>Group Page</h1>
      )}
      {isCurrentUserOwner && (
        <div className='glist'>
          <h3>Join Requests</h3>
          <ul>
            {joinRequests.map((request) => (
              <li key={request.id}>
                {request.username} wants to join
                <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
                <button onClick={() => handleDeleteRequest(request.id)}>Reject</button>
              </li>
            ))}
          </ul>
            <h3>Group Users</h3>
            <ul>
              {groupUsers.map((user) => (
                <li key={user.username}>
                  {user.username}
                  {isCurrentUserOwner && (
                    <button onClick={() => handleDeleteUser(user.username)}>Delete</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
    </body>
  );
}