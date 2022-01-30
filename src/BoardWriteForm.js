import React, { Component } from "react";
import CKEditor from "ckeditor4-react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardWriteForm extends Component {
  state = {
    data: "",
  };

  componentDidMount() {
    if (this.props.location.query !== undefined) {
      this.boardTitle.value = this.props.location.query.title;
    }
  }

  componentWillMount(){
    if (this.props.location.query !== undefined) {
      this.setState({
        data: this.props.location.query.content
      });
    }
  }
  
  writeBoard = () => {
    let send_param;
    let url;

    const boardTitle = this.boardTitle.value;
    const boardContent = this.state.data;

    if (boardTitle === undefined || boardTitle === "") {
      this.boardTitle.focus();
      alert("글 제목을 입력해주세요");
    } else if (boardContent === "" || boardContent === undefined) {
      this.boardTitle.focus(); // ckeditor 에 focus()를 해야되는데 방법 찾아봐야함
      alert("글 내용을 입력해주세요");
    } else {
      url = "http://localhost:8080/board/write";
      send_param = {
        headers,
        _id: $.cookie("login_id"),
        title: boardTitle,
        content: boardContent,
      };
    }

    axios
      .post(url, send_param)
      .then((returnData) => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          window.location.reload();
        } else {
          alert("글쓰기 실패");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onEditorChange = (evt) => {
    this.setState({
      data: evt.editor.getData(),
    });
  };

  render() {
    const divStyle = {
      margin: 50,
    };
    const titleStyle = {
      marginBottom: 5,
    };
    const buttonStyle = {
      marginTop: 5,
    };
    return (
      <div style={divStyle}>
        <h2>글쓰기</h2>
        <Form.Control
          type="text"
          ref={(ref) => (this.boardTitle = ref)}
          placeholder="글 제목"
          style={titleStyle}
        />
        <CKEditor
          data={this.state.data}
          onChange={this.onEditorChange}
        ></CKEditor>
        <Button style={buttonStyle} onClick={this.writeBoard} block>
          저장하기
        </Button>
      </div>
    );
  }
}

export default BoardWriteForm;
