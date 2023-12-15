import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';

Modal.setAppElement('#root');

export default function NewsFin() {
  const { idGroup } = useParams();
  const [isCurrentUserMember, setIsCurrentUserMember] = useState(false);
  const [fnews, setFnews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchResult, setFetchResult] = useState([]);

  useEffect(() => {
      checkIfUserIsMember();
      fetchDataFromFinnkino();
  }, [idGroup]);

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

  const fetchDataFromFinnkino = async () => {
    try {

      const response = await axios.get(`https://www.finnkino.fi/xml/News/`);
      const xmlData = response.data;
      const jsResult = await xml2js.parseStringPromise(xmlData);
      const newsArray = jsResult.News;

      setFnews(newsArray);
      setFetchResult(newsArray);
    } catch (error) {
      console.error('Error fetching data from Finnkino:', error.message);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchNews = async () => {
    try {
      await fetchDataFromFinnkino();
      if (fetchResult.length === 0) {
        console.log('No news available');
      }
    } catch (error) {
      console.error('Error searching Finnkino news:', error.message);
    }
  };

  const handleAddToGroup = async (selectedNews) => {
    try {
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(`http://localhost:3001/group/group/${idGroup}/news/add-news`, { selectedNews }, config);
      console.log('News added to the group successfully');
      handleCloseModal();
    } catch (error) {
      console.error('Error adding news to the group:', error.message);
    }
  };

  return (
    <body>
    <div>
      {isCurrentUserMember && (
        <div className='fin'>
          <h3>Finnkino News</h3>
          <button onClick={handleOpenModal}>Add Finnkino News</button>
          <ul>
          {Array.isArray(fnews) && fnews.length > 0 ? (
            fnews.map((item, index) => (
              <li key={index}>
                {item.title} - {item.publishDate}
              </li>
            ))
          ) : null /* No message when no news available */}
          </ul>
          <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} contentLabel="Add Finnkino News">
            <h2>Add Finnkino News</h2>
            <button onClick={handleSearchNews}>Search News</button>
            <ul>
              {Array.isArray(fnews.NewsArticle) ? (
                fnews.NewsArticle.map((item, index) => (
                  <li key={index}>
                    {item.Title[0]} - {item.PublishDate[0]}
                    <button onClick={() => handleAddToGroup(item)}>Add to Group</button>
                  </li>
                ))
              ) : (
                <li>No news available</li>
              )}
            </ul>
            <button onClick={handleCloseModal}>Close</button>
          </Modal>
        </div>
      )}
    </div>
    </body>
  );
}

