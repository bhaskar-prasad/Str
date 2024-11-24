import axios from "axios";
import React, { useEffect, useState } from "react";

const HomePage = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/abcds?filters[UserId][$eq]=${userId}&populate=*`
        );
        if (response.data.data.length > 0) {
          setUserData(response.data.data[0]);
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const { Content, Config, logo } = userData;
  const backgroundColor = Config?.backgroundColor || "#fff";

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo at the top left */}
      {logo?.url && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
        >
          <img
            src={`http://localhost:1337${logo.url}`}
            alt="Logo"
            style={{
              maxWidth: "150px",
              height: "auto",
            }}
          />
        </div>
      )}

      {/* Content in the center */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: Content }}
          style={{
            fontSize: "20px",
            color: "#333",
            maxWidth: "800px",
            lineHeight: "1.6",
            backgroundColor: "#ffffffcc",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
