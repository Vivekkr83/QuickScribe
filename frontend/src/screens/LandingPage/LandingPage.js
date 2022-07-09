import React, { useEffect } from "react";
// import { Container } from "react-bootstrap";
import "./LandingPage.css";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  return (
    <div className="out-main">
      <div className="main">
        <div className="landContent">
          <div className="intro">
            <div className="main-title">
              <h2>
                Welcome to <br />
              </h2>
              <h1>
                <div className="Name">AZzipP Notes</div>
              </h1>
            </div>
            <div className="sub-title">
              <p>
                One place for <b>ALL your Notes!</b>
              </p>
            </div>
          </div>
        </div>

        <div className="authen">
          <div className="Log">
            <Link to="/login">
              <Button className="Login" size="lg">
                Login
              </Button>
            </Link>
          </div>
          <div className="Sign">
            <Link to="/register">
              <Button className="Signin" size="lg" variant="outline-primary">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
