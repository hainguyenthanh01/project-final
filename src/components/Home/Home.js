import React, { useEffect, useState } from "react";
import axios from "axios";

import "mdb-ui-kit/css/mdb.min.css";
import { Route, Link, Switch, NavLink } from "react-router-dom";
import bg1 from "../../images/banner/bg1.png";
import bg2 from "../../images/banner/bg2.png";
import bg3 from "../../images/banner/bg3.png";
import bg4 from "../../images/banner/bg4.png";
import bg5 from "../../images/banner/bg5.png";

import classNames from "classnames/bind";
import styles from "../../css/home.module.css";

let cx = classNames.bind(styles);

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    axios
      .get("https://amiristore.rf.gd/Server/api/products/read.php")
      .then(function (response) {
        setProducts(response.data.data);
      });
  }

  return (
    <div className={cx("home")}>
      <div className="container">
        <div
          className="container text-center"
          style={{ marginTop: "10px", marginBottom: "5vh" }}
        >
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            <video
              autoPlay={true}
              allow="autoplay"
              loop={true}
              muted={true}
              playsInline={true}
              style={{ width: "100%" }}
            >
              <source src="https://thombrownevn.com/wp-content/uploads/2020/06/1813487637.mp4" />
            </video>
          </div>
        </div>

        <div
          style={{
            fontFamily: "ThanhHai",
            color: "gray",
            fontSize: "35px",
            marginTop: "60px",
            marginBottom: "10vh",
          }}
          id="carouselBasicExample"
          className="carousel slide carousel-fade"
          data-mdb-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={bg5}
                className="d-block w-100"
                alt="Sunset Over the City"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Khám phá phong cách đường phố</h5>
                <p>Xem ngay tại cửa hàng của chúng tôi</p>
              </div>
            </div>

            <div className="carousel-item">
              <img src={bg4} className="d-block w-100" alt="Canyon at Nigh" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Rất nhiều thương hiệu mới</h5>
                <p>Nhanh tay săn đón</p>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
