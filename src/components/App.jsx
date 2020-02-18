import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import { API_URL, API_KEY_3, fetchApi } from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppContext = React.createContext();
export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      user: null,
      session_id: null,
      filters: {
        sort_by: "popularity.desc",
        release_year: "",
        with_genres: [],
        page: 1,
      },
      totalPages: 1,
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user);
      });
    }
  }

  updateUser = user => {
    this.setState({
      user,
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000,
    });
    this.setState({
      session_id,
    });
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
    });
  };

  onChangeFilters = event => {
    const { name, value } = event.target;
    this.updateFilters(name, value);
  };

  updateFilters = (name, value) => {
    // this.setState({
    //   filters: {
    //     ...this.state.filters,
    //     [name]: value
    //   }
    // });

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }));
  };

  clearFilters = () => {
    this.setState(this.initialState);
  };

  onChangeTotalPages = totalPages => {
    this.setState({
      totalPages,
    });
  };

  render() {
    const { filters, totalPages, user, session_id } = this.state;

    //console.log("this.updateUser", this.updateUser);

    return (
      <AppContext.Provider
        value={{
          user: user,
          session_id: session_id,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          onLogOut: this.onLogOut,
        }}
      >
        <div>
          <Header
            user={user}
            updateUser={this.updateUser}
            updateSessionId={this.updateSessionId}
          />
          <div className="container">
            <div className="row mt-4">
              <div className="col-4">
                <div className="card">
                  <div className="card-body">
                    <h3>Фильтры:</h3>
                    <Filters
                      totalPages={totalPages}
                      filters={filters}
                      onChangeFilters={this.onChangeFilters}
                      updateFilters={this.updateFilters}
                      clearFilters={this.clearFilters}
                    />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <MoviesList
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangeTotalPages={this.onChangeTotalPages}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}
