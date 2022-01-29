import React, { Component } from "react"; // {} 비구조화 할당이라고 한다. ex)'react'를 Component로 쓰겠다.
import { Navbar, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jqeury.cookie";

axios.default.withCredentials = true;
const headers = { withCredentials: true };

class Header extends Component {
  state = {
    buttonDisplay: "none",
  };
  componentDidMount() {
    if ($.cookie("login_id")) {
      this.setState({
        buttonDisplay: "block",
      });
    } else {
      this.setState({
        buttonDisplay: "none",
      });
    }
  }
  logout = () => {
    axios
      .get("http://localhost:8080/member/logout", { headers })
      .then((returnData) => {
        if (returnData.data.message) {
          $.removeCookie("login_id");
          alert("로그아웃 되었습니다.");
          window.location.href = "/";
        }
      });
  };
  render() {
    const buttonStyle = {
      margin: "0px 5px 0px 10px",
      display: this.state.buttonDisplay,
    };
    return (
      <div>
        <Navbar>
          <Navbar.Brand href="/">Today I Learned</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {}
            <NavLink to="/">
              <Button style={buttonStyle}>글목록</Button>
            </NavLink>
            <NavLink to = "/boardWrite">
                <Button style = {buttonStyle}>글쓰기</Button>
            </NavLink>
            <Button style = {buttonStyle} onClick = {this.logout} variant = "primary">
                로그아웃
            </Button>
          </Navbar.Collapse>
        </Navbar>
        <Image src = "./img/main.png"></Image>
      </div>
    );
  }
}

export default Header;
