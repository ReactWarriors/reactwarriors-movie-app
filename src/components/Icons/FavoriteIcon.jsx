import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import {Star, StarBorder} from "@material-ui/icons";

class FavoriteIcon extends React.Component {
  render() {
    const {id} = this.props;
    const favorite = this.props.favorites.has(id);
    let disabled = this.props.submittingFavorites;
    let onClick = !disabled ? (() => this.props.changeFavorite(id, !favorite)) : undefined;
    return (
      <span>
        {
          favorite
            ? <Star onClick={onClick}/>
            : <StarBorder onClick={onClick}/>
        }
      </span>
    )
  }
}

export default AppContextHOC(FavoriteIcon);
