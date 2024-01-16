import React from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
const Home = () => {
  return (
    <>
      <div className="section">
        <Link className="link1" to={"/addressAnalysis"}>
          Tách địa chỉ
        </Link>
        <Link className="link2" to={"/searchAddress"}>
          Tìm latlong
        </Link>
        <Link to={"/diachi"}>DiaChiComponent</Link>
      </div>
    </>
  );
};

export default Home;
