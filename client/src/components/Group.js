import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GroupList () {
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

  return (
    <div>
      <h2>Group List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {groups.map((groups) => (
            <li key={groups.idGroup}>{groups.groupname} : {groups.description}</li>
          ))}
        </ul>
      )}
    </div>
  );
};




