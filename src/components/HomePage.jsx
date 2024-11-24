import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/abcds?filters[UserId][$eq]=${userId}&populate=*`);
        if (response.data.data.length > 0) {
          setUserData(response.data.data[0]); 
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const {
    Content,
    Config,
    logo,
  } = userData;

  const backgroundColor = Config?.backgroundColor || '#fff';

  return (
    <div style={{ backgroundColor: backgroundColor, minHeight: '100vh', padding: '20px' }}>
      {logo?.url && <img src={`http://localhost:1337${logo.url}`} alt="Logo" style={{ maxWidth: '200px' }} />}
      <div dangerouslySetInnerHTML={{ __html: Content }} />
      {/* <pre>{JSON.stringify(Config, null, 2)}</pre> */}
    </div>
  );
};

export default HomePage;
