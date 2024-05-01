import React from "react";
import "./About.css"; // Import custom CSS for styling

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Us</h1>
        <p className="about-description">
          Welcome to Evans Estate, your number one source for all things real
          estate. We're dedicated to giving you the very best of property
          listings, with a focus on reliability, customer service, and
          uniqueness.
        </p>
        <p className="about-description">
          Founded in 2020 by John Doe, Evans Estate has come a long way from its
          beginnings in a small office in New York City. When John first started
          out, his passion for providing high-quality real estate listings drove
          him to start his own business.
        </p>
        <p className="about-description">
          We hope you enjoy our products as much as we enjoy offering them to
          you. If you have any questions or comments, please don't hesitate to
          contact us.
        </p>
        <p className="about-description">
          Sincerely,
          <br />
          The Evans Estate Team
        </p>
      </div>
    </div>
  );
};

export default About;
