import React, { useState } from "react";
import axios from "axios";
import "./css/style.css";
import { Link } from "react-router-dom";

function LatLong() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const openGoogleMaps = () => {
    if (latitude !== null && longitude !== null) {
      window.open(
        `https://maps.google.com/?q=${latitude},${longitude}`,
        "_blank"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=AIzaSyDWOhz1m3MyMjuGExXLYQmr9vyFV9iYetw`
      );

      if (response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        const lat = result.geometry.location.lat;
        const lon = result.geometry.location.lng;
        setLatitude(lat);
        setLongitude(lon);
      } else {
        // xu ly truong hop dia chi khong chinh xac
        await findNearestLocation();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const findNearestLocation = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDWOhz1m3MyMjuGExXLYQmr9vyFV9iYetw`
      );

      if (response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        const formattedAddress = result.formatted_address;
        setAddress(formattedAddress);
      } else {
        console.error("Không thể tìm thấy địa chỉ gần nhất");
      }
    } catch (error) {
      console.error("Lỗi khi tìm địa chỉ gần nhất:", error);
    }
  };

  return (
    <div className="App">
      <Link to={"/"}>Home</Link>
      <h1>Tìm LatLong</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập địa chỉ cần tìm vào đây"
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
          <button onClick={openGoogleMaps}>Mở trên Google Maps</button>
        </div>
      )}
    </div>
  );
}

export default LatLong;
