import React from "react";
import { Link} from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Full stack application for BooleanUK
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div>
            <ul>
              <li>
                <Link to = "/login">Log in</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to = "/signup">Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
