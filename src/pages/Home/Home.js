import React from "react";
import { BsFillBootstrapFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inventory.webp";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between ">
        <div className="logo">
          <BsFillBootstrapFill size={35} />
        </div>

        <ul className="home-links">
       
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className="container hero">
        <div className="hero-text">
          <h2>IT inventory</h2>
          <p>
          Inventory management is a critical part of every business. It helps you keep track
            of your inventory and stock levels, make informed purchase decisions, and
            manage your warehouse efficiently.
          </p>
          <p>
           This is Inventory App to control and manage proucts in the warehouse, disabled match for serial and asset number,
           control the Inventory by the name of the product and the quantity For better results
          </p>
          <div className="hero-buttons">
        
          </div>
          <div className="--flex-start">
            <NumberText num="10" text="Brand Owners" />
            <NumberText num="23K" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div>
        </div>

        <div className="hero-image">
          <img style={{width:"600px"}} src={heroImg} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
