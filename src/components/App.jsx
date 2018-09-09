import React from "react";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-3">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
              </div>
            </div>
          </div>
          <div className="col-9">
            <MoviesList />
          </div>
        </div>
      </div>
    );
  }
}
