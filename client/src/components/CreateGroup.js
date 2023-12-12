import React, { useState } from "react";
import axios from "axios";

export default function CreateGroup() {
  const [groupname, setGroupname] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateGroup = async () => {
    try {
    const token = sessionStorage.getItem("token");
      await axios.post(
        "http://localhost:3001/group/create",
        { groupname, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error creating group:", error.message);
    }
  };

  return (
    <div className="form">
        <h2>Crete group</h2>
        <form>
        <p>Group name</p>
      <input value={groupname} onChange={e => setGroupname(e.target.value)} /><br />
      <p>Description</p>
      <input value={description} onChange={e => setDescription(e.target.value)} /><br />
      <br></br>
      <button onClick={handleCreateGroup}>Create Group</button>
      </form>
    </div>
  );
}
