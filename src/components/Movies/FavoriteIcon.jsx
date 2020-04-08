import React from "react";
import PropTypes from "prop-types";
import { Star, StarBorder } from "@material-ui/icons";
import CallApi from "../../api/api";
import AppContextHOC from "../HOC/AppContextHOC";

const FavoriteIcon = (props) => {
  const { item, favorite } = props;

  const isFavorite = favorite.some((movie) => movie.id === item.id);

  const onClickFavorite = () => {
    const { user, session_id, uploadFavorite, toggleShowLogin } = props;
    if (!session_id) {
      toggleShowLogin();
      return;
    }

    CallApi.post(`/account/${user.id}/favorite`, {
      params: {
        session_id,
        media_type: "movie",
        media_id: item.id,
        favorite: !isFavorite,
      },
    })
      .then(() => {
        uploadFavorite(user, session_id);
      })
      .catch((error) => {});
  };

  return isFavorite ? (
    <Star onClick={onClickFavorite} />
  ) : (
    <StarBorder onClick={onClickFavorite} />
  );
};

FavoriteIcon.propTypes = {
  item: PropTypes.object.isRequired,
  // isFavorite: PropTypes.bool.isRequired
  //onClickFavorite: PropTypes.func.isRequired,
};

export default AppContextHOC(FavoriteIcon);
