import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "../config/UserState";
import { FIND_BY_TITLE } from "../graphql/Queries";
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const getUserSession = userState((state) => state.session);
  console.log("current session", getUserSession);

  const [title, setTitle] = useState("");
  const [movieInfo, setmovieInfo] = useState("");
  const [findByTitle, { data, error }] = useLazyQuery(FIND_BY_TITLE);

  const destroyUserSession = userState((state) => state.removeSession);
  return (
    <nav className="navbar navbar-expand-lg bg-black fixed-top mb-4">
      <div className="container-fluid">
        <a
          className="navbar-brand text-danger navbar-logo mx-4   fw-bold
"
        >
          NETFLIX
        </a>

        {getUserSession.isValid && (
          <>
            <button
              className="navbar-toggler "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon " />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active text-white ms-5"
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/create-movie"
                    className="nav-link text-white ms-5"
                    href="#"
                  >
                    Create Movie
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  onBlur={async (event) => {
                    console.log("onblur fired!!");
                    await findByTitle({ variables: { title: title } }).then(
                      (response) => {
                        console.log("response", response);
                        var movieData = response.data.findByTitle;
                        setmovieInfo(movieData);
                        console.log(movieData);
                      }
                    );
                  }}
                  className="form-control mx-4 "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <Link
                  to="/moviesSearch"
                  state={{ movieData: movieInfo }}
                  className="btn border-white text-white"
                  type="submit"
                >
                  Search
                </Link>
              </form>
              <button
                onClick={async (e) => {
                  destroyUserSession();
                  navigate("/");
                }}
                type="button"
                class="btn btn-danger mx-4 my-3 "
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
