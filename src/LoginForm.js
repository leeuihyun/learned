import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };
// 위 두줄 의미 : axios통신을 할때 노드js 와 동일기원으로 허용을 해주기 위함이다.

//렌더링 전은 react 문법을 써야함. (rule)

class LoginForm extends Component {
  componentDidMount() {
    loadReCaptcha("6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb");
  }
  verifyCallBack = (recaptchaToken) => {
    console.log(recaptchaToken, "<= your recaptcha token");
  };

  join = () => {
    //회원가입 function
    const joinEmail = this.joinEmail.value;
    const joinName = this.joinName.value;
    const joinPassword = this.joinPassword.value;
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (joinEmail === "" || joinEmail === undefined) {
      alert("이메일 주소를 입력해주세요");
      this.joinEmail.focus(); // 이메일주소가 비었기 때문에 이메일 주소칸으로 focus()
      return;
    } else if (
      joinEmail.match(regExp) === null ||
      joinEmail.match(regExp) === undefined
    ) {
      alert("이메일 주소를 형식에 맞게 입력해주세요.");
      this.joinEmail.value = "";
      this.joinEmail.focus();
      return;
    } else if (joinName === "" || joinName === undefined) {
      alert("이름을 입력해주세요");
      this.joinName.focus();
      return;
    } else if (joinPassword === "" || joinPassword === undefined) {
      alert("비밀번호를 입력해주세요");
      this.joinPassword.focus();
      return;
    } else if (
      joinPassword.match(regExp2) === null ||
      joinPassword.match(regExp2) === undefined
    ) {
      alert(
        "비밀번호를 형식에 맞게 입력해주세요(숫자와 문자, 특수문자 포함 8~16자리)"
      );
      this.joinPassword.value = "";
      this.joinPassword.focus();
      return;
    }
    const send_param = {
      headers,
      email: joinEmail,
      name: joinName,
      password: joinPassword,
    };
    axios
      .post("http://localhost:8080/member/join", send_param)
      //정상수행되었다면 ?
      .then((returnData) => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          //email 중복 체크. 1 이면 중복이 된것. 따라서 포커싱 변경해줌.
          if (returnData.data.dupYn === "1") {
            this.joinEmail.value = "";
            this.joinEmail.focus();
          } else {
            this.joinEmail.value = "";
            this.joinName.value = "";
            this.joinPassword.value = "";
          }
        } else {
          alert("회원가입 실패");
        }
      })
      //에러
      .catch((err) => {
        console.log("returnData err");
      });
  };

  login = () => {
    //로그인 function
    const loginEmail = this.loginEmail.value;
    const loginPassword = this.loginPassword.value;

    if (loginEmail === "" || loginEmail === undefined) {
      alert("이메일 주소를 입력해주세요");
      this.loginEmail.focus();
      return;
    } else if (loginPassword === "" || loginPassword === undefined) {
      alert("비밀번호를 입력해주세요");
      this.loginPassword.focus();
      return;
    }

    const send_param = {
      headers,
      email: loginEmail,
      password: loginPassword,
    };

    axios
      .post("http://localhost:8080/member/login", send_param)
      //정상 수행 되었다면
      .then((returnData) => {
        if (returnData.data.message) {
          //console.log("login_id" + returnData.data._id);
          $.cookie("login_id", returnData.data._id, { expires: 1 });
          //쿠키 하루 저장 및 쿠키에 login_id 키에 받아온 returnData.data._id 값을 넣어준다.
          $.cookie("login_email", returnData.data.email, { expires: 1 });
          alert(returnData.data.message);
          window.location.reload(); // 윈도우 새로고침
        } else {
          alert(returnData.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const formStyle = {
      margin: 50,
    };
    const buttonStyle = {
      marginTop: 10,
    };
    return (
      <Form style={formStyle}>
        <Form.Group controlId="joinForm">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            maxLength="100"
            ref={(ref) => (this.joinEmail = ref)}
            placeHolder="Enter your email"
          />
          <Form.Text className="text_muted">
            We'll never share your information with anyone else.
          </Form.Text>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            maxLength="20"
            ref={(ref) => (this.joinName = ref)}
            placeholder="Enter your name"
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            maxLength="64"
            ref={(ref) => (this.joinPassword = ref)}
            placeHolder="Enter your password"
          />
          <Button
            style={buttonStyle}
            onClick={this.join} // 위에 join function
            variant="primary"
            type="button"
            block // 화면끝까지.
          >
            회원가입
          </Button>
        </Form.Group>
        <Form.Group controlId="loginForm">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            maxLength="100"
            ref={(ref) => (this.joinEmail = ref)}
            placeHolder="Enter you email"
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            maxLength="64"
            ref={(ref) => (this.joinPassword = ref)}
            placeHolder="Enter your password"
          />
          <ReCaptcha
            sitekey="6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb"
            action="login"
            verifyCallback={this.verifyCallback}
          />
          <Button
            style={buttonStyle}
            type="button"
            variant="primary"
            onClick={this.login} // login function(위에)
            block
          >
            로그인
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default LoginForm;
