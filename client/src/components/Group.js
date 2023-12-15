import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://localhost:3001/group/group");
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const handleJoinGroup = async (idGroup) => {
    try {
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log('Joining group with id:', idGroup);
      await axios.post(`http://localhost:3001/group/group/${idGroup}/users/requests`, {}, config);
    } catch (error) {
      console.error("Error joining group:", error.message);
    }
  };
  
  
  return (
    <div>
      <h2>Group List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li key={group.idGroup}>
              <Link to={`/group/${group.idGroup}`}>{group.groupname}</Link> <br /> {group.description}<br />
               <button onClick={() => handleJoinGroup(group.idGroup)}>Join Group</button><br /><br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

