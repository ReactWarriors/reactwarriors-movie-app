import React, {Component} from "react";
import {withAuth} from "../../../hoc/withAuth";
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
    const {auth, authActions} = this.props;

    CallApi.delete("/authentication/session", {
      body: {
        session_id: auth.session_id
      }
    })
      .then(() => {
        authActions.onLogOut();
      })
  };

  render() {
    const {auth} = this.props;

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
            src={`https://secure.gravatar.com/avatar/${auth.user.avatar.gravatar.hash}.jpg?s=64`}
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

export default withAuth(UserMenu);
