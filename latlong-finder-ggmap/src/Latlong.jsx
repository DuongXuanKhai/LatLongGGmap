import React, { useState } from "react";
import axios from "axios";

function Latlong() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );

      if (response.data && response.data.length > 0) {
        const result = response.data[0];
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        setLatitude(lat);
        setLongitude(lon);
      } else {
        // Nếu không tìm thấy địa chỉ chính xác, sử dụng tọa độ gần nhất
        const nearestLocationResponse = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=0&lon=0`
        );

        if (
          nearestLocationResponse.data &&
          nearestLocationResponse.data.lat &&
          nearestLocationResponse.data.lon
        ) {
          const lat = parseFloat(nearestLocationResponse.data.lat);
          const lon = parseFloat(nearestLocationResponse.data.lon);
          setLatitude(lat);
          setLongitude(lon);
        } else {
          // Xử lý trường hợp không tìm thấy tọa độ gần nhất
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>LatLong Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập địa chỉ"
          value={address}
          onChange={handleInputChange}
        />
        <button type="submit">Tìm</button>
      </form>
      {latitude !== null && longitude !== null && (
        <div>
          <h2>Tọa độ:</h2>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      )}
    </div>
  );
}

export default Latlong;
