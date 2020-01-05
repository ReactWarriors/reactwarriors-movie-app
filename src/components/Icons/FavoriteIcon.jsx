import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import {Star, StarBorder} from "@material-ui/icons";
import CallApi from "../../api/api";
import PropTypes from "prop-types";
import classNames from "classnames";

class FavoriteIcon extends React.Component {
  constructor() {
    super();

    this.state = {
      submittingFavorites: false
    }
  }

  changeFavorite = (movieId, isFavorite) => {
    const {session_id, getFavorites, toggleModal, user} = this.props;

    if (user) {
      this.setState({
        submittingFavorites: true
      });
      CallApi.post(`/account/${user.id}/favorite`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: movieId,
          favorite: isFavorite
        }
      })
        .then(() => {
          return getFavorites();
        })
        .then(() => {
          this.setState({
            submittingFavorites: false
          })
        })
    } else {
      toggleModal();
    }
  };

  render() {
    const {movieId} = this.props;
    const favorite = this.props.favorites.includes(movieId);
    const disabled = this.state.submittingFavorites;
    const onClick = () => this.changeFavorite(movieId, !favorite);

    return (
      <span className={classNames({"icon-disabled": disabled})}>
        {
          favorite
            ? <Star onClick={onClick}/>
            : <StarBorder onClick={onClick}/>
        }
      </span>
    )
  }
}

FavoriteIcon.propTypes = {
  getFavorites: PropTypes.func,
  session_id: PropTypes.string,
  toggleModal: PropTypes.func,
  user: PropTypes.object,
  movieId: PropTypes.number,

};

export default AppContextHOC(FavoriteIcon);
