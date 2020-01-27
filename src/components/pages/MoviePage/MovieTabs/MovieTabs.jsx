import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import {Route} from "react-router";

const MovieTabs = (props) => {
  const movieId = props.match.params.id;

  return (
    <Route>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to={`/movie/${movieId}/detail`}
            >
              О фильме
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to={`/movie/${movieId}/videos`}
            >
              Видео
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to={`/movie/${movieId}/credits`}
            >
              Актёры
            </NavLink>
          </li>
        </ul>
    </Route>
  );
};

export default withRouter(MovieTabs);
