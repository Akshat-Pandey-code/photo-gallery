import React, { useEffect, useState } from "react";
import PhotoCard from "./PhotoCard";
import "./index.css";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setPhotos((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        if (hasMore) {
          setPage((prev) => prev + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div className="gallery-container">
      <h1 className="gallery-heading">Photo gallery</h1>
      <div className="photo-list">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default App;
