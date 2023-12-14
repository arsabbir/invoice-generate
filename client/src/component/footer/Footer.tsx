import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      {" "}
      <footer className="footer px-4 py-6">
        <div className="footer-content">
          <p className="text-sm text-gray-600 text-center">
            © Invoice 2023. All rights reserved.{" "}
            <Link to="https://www.linkedin.com/in/arsabbir/">by AR Sabbir</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
