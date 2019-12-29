import React, {Component} from "react";
import AppContextHOC from "../../HOC/AppContextHOC";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import CallApi from "../../../api/api";

class UserMenu extends Component {
  state = {
    dropdownOpen: false
  };

  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  };

  handleLogOut = () => {
    CallApi.delete("/authentication/session", {
      body: {
        session_id: this.props.session_id
      }
    })
      .then(() => {
        this.props.onLogOut();
      })
  };

  render() {
    const {user} = this.props;
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggleDropdown}
      >
        <DropdownToggle
          tag="div"
          onClick={this.toggleDropdown}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          <img
            width="40"
            className="rounded-circle"
            src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64`}
            alt="avatar"
            onClick={this.toggleDropdown}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            onClick={this.handleLogOut}
          >Выйти</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default AppContextHOC(UserMenu);
