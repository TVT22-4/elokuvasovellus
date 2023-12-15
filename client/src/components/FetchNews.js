import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function FetchNews(){
  const [fetchedNews, setFetchedNews] = useState([]);
  const { idGroup } = useParams();
  const [isCurrentUserMember, setIsCurrentUserMember] = useState(false);

  useEffect(() => {
    checkIfUserIsMember();
    fetchNews();
  }, [idGroup]);

  const fetchNews = useCallback(async () => {
    try {
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`http://localhost:3001/group/group/${idGroup}/news`, config);
      setFetchedNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error.message);
    }
  });

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
    <div>
      {isCurrentUserMember && (
        <div>
          <h2>Group News</h2>
          <ul>
            {fetchedNews.length > 0 ? (
              fetchedNews.map((item) => (
                <li key={item.idgroup}>
                  {item.title} - {item.publishdate}
                </li>
              ))
            ) : (
              <li>No news</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};  

