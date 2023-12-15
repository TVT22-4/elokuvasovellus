import axios from "axios";

const FetchUserData = async (username) => {
  try {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.get(`http://localhost:3001/user/user/${username}`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    throw error;
  }
};

export { FetchUserData };
