import React from "react";
import {withAuth} from "../../hoc/withAuth";
import {Star, StarBorder} from "@material-ui/icons";
import CallApi from "../../api/api";
import PropTypes from "prop-types";
import classNames from "classnames";

class FavoriteIcon extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false
    }
  }

  changeFavorite = () => {
    const {user, session_id} = this.props.auth;
    const {authActions, movieId} = this.props;

    if (user) {
      this.setState({
        loading: true
      });
      CallApi.post(`/account/${user.id}/favorite`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: movieId,
          favorite: !this.isFavorite()
        }
      })
        .then(() => {
          return authActions.fetchFavorites({user, session_id});
        })
        .then(() => {
          this.setState({
            loading: false
          })
        })
    } else {
      authActions.toggleModal();
    }
  };

  isFavorite = () => this.props.auth.favorites.some(item => item.id === this.props.movieId);

  render() {

    return (
      <span className={classNames({
        "icon-disabled": this.state.loading
      })}>
        {
          this.isFavorite()
            ? <Star onClick={this.changeFavorite}/>
            : <StarBorder onClick={this.changeFavorite}/>
        }
      </span>
    )
  }
}

FavoriteIcon.propTypes = {
  updateFavorites: PropTypes.func,
  session_id: PropTypes.string,
  toggleModal: PropTypes.func,
  user: PropTypes.object,
  movieId: PropTypes.number,
};

export default withAuth(FavoriteIcon);
