import React from "react";
import {NavLink, Redirect, Switch} from "react-router-dom";
import {Route} from "react-router";
import MovieDetail from "../MovieMain/MovieDetail";
import MovieVideos from "../Video/MovieVideos";
import MovieCredits from "../Credits/MovieCredits";

const MovieTabs = ({movieId}) => {

  return (
    <Route>
      <div className="container">
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
        <div>
          <Switch>
            <Route path={`/movie/${movieId}/detail`}>
              <MovieDetail movieId={movieId}/>
            </Route>
            <Route path={`/movie/${movieId}/videos`}>
              <MovieVideos movieId={movieId}/>
            </Route>
            <Route path={`/movie/${movieId}/credits`} >
              <MovieCredits movieId={movieId}/>
            </Route>
            <Route exact path={`/movie/${movieId}`}>
              <Redirect to={`/movie/${movieId}/detail`}/>
            </Route>
          </Switch>
        </div>
      </div>
    </Route>
  );
};

export default MovieTabs;
