import React, { useState } from "react";
import "./Home.css";
import Nav from "../../components/Nav";
import AuthModal from "../../components/AuthModal";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  // const authToken = false;
  const handleClick = () => {
    console.log("clicked Create account");
    setShowModal(true);
    setIsSignUp(true);
  };
  return (
    <div className="overlay">
      <Nav
        // authToken={authToken}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <video autoPlay loop muted>
          <source src="/images/bk5.mp4" type="video/mp4" />
        </video>
        {/* <h1>Want a date?</h1> */}
        <button className="primary-button1" onClick={handleClick}>
          <div className="wrapper">
            <p className="text1">Create Account</p>

            <div className="flower flower1">
              <div className="petal one"></div>
              <div className="petal two"></div>
              <div className="petal three"></div>
              <div className="petal four"></div>
            </div>
            <div className="flower flower2">
              <div className="petal one"></div>
              <div className="petal two"></div>
              <div className="petal three"></div>
              <div className="petal four"></div>
            </div>
            <div className="flower flower3">
              <div className="petal one"></div>
              <div className="petal two"></div>
              <div className="petal three"></div>
              <div className="petal four"></div>
            </div>
            <div className="flower flower4">
              <div className="petal one"></div>
              <div className="petal two"></div>
              <div className="petal three"></div>
              <div className="petal four"></div>
            </div>
            <div className="flower flower5">
              <div className="petal one"></div>
              <div className="petal two"></div>
              <div className="petal three"></div>
              <div className="petal four"></div>
            </div>
            <div className="flower flower6">
              <div className="petal one"></div>
              <div className="petal two"></div>
              <div className="petal three"></div>
              <div className="petal four"></div>
            </div>
          </div>
        </button>

        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )}
      </div>
    </div>
  );
}

export default Home;
