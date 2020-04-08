import React from "react";
import PropTypes from "prop-types";
import { Star, StarBorder } from "@material-ui/icons";
import CallApi from "../../api/api";
import { AppContext } from "../App";

const FavoriteIcon = ({ item }) => {
  //console.log("onClickFavorite", onClickFavorite);

  return (
    <AppContext.Consumer>
      {context => {
        //console.log("onClickFavorite2", onClickFavorite);

        const isFavorite = Boolean(
          context.favorite.find(movie => {
            return movie.id === item.id;
          })
        );

        return isFavorite ? (
          <Star onClick={e => onClickFavorite(item, false, context)} />
        ) : (
          <StarBorder onClick={e => onClickFavorite(item, true, context)} />
        );
      }}
    </AppContext.Consumer>
  );
};

const onClickFavorite = (item, newValue, context) => {
  const { user, session_id, uploadFavorite, toggleShowLogin } = context;

  if (!session_id) {
    toggleShowLogin();
    return;
  }

  //console.log("newValue", newValue);

  CallApi.post(`/account/${user.id}/favorite`, {
    params: {
      session_id: session_id,
      media_type: "movie",
      media_id: item.id,
      favorite: newValue
    }
  }).then(
    response => {
      uploadFavorite(user, session_id);
    },
    reject => {}
  );
};

FavoriteIcon.propTypes = {
  item: PropTypes.object.isRequired
  // isFavorite: PropTypes.bool.isRequired
  //onClickFavorite: PropTypes.func.isRequired,
};

export default FavoriteIcon;
