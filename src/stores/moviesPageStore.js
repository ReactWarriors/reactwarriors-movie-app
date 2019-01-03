import { observable, computed, action, configure } from "mobx";

configure({ enforceActions: "always" });

class MoviesPageStore {
  @observable movies = [];

  @observable filters = {
    sort_by: "popularity.desc",
    primary_release_year: "2018",
    with_genres: []
  };

  @observable page = 1;

  @observable total_pages = "";
}

export const moviesPageStore = new MoviesPageStore();
