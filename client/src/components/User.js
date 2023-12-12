import React, { useEffect } from "react";
import { jwtToken, userInfo } from "./Signals";
import { FetchUserData } from "./FetchUserData";

function UserData() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Access the username from jwtToken
                const username = jwtToken.value.username;
                const userData = await FetchUserData(username);
                console.log("User Data:", userData);
                userInfo.value = userData;
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        };
        fetchData();
    }, []);

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
                    <button onClick={() => jwtToken.value = ''}>Logout</button>
                </div>
            )}
        </div>
    );
}

export { UserData };