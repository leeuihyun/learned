import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import BoardForm from "./BoardForm";
import BoardWriteForm from "./BoardWriteForm";
import BoardDetail from "./BoardDetail";
import MypageForm from "./MypageForm";
import $ from "jquery";
import {} from "jquery.cookie";
import {Route} from "react-route-dom";

class Body extends Component{
    render(){
        let resultForm;
        function getResultForm(){
            if($.cookie("login_id")){ //쿠키에 로그인 아이디가 있을 때
                resultForm = <Route exact path = "/" component = {BoardForm}></Route>;
            }
            else{ //쿠키에 로그인 아이디 없을 때
                resultForm = <Route exact path = "/" component = {LoginForm}></Route>
            }
            return resultForm;
        }
        getResultForm();
        return(
            <div>
                <Route path = "/mypage" component = {MypageForm}></Route>
                <Route path = "/boardWrite" component = {BoardWriteForm}></Route>
                <Route path = "/board/detail" component = {BoardDetail}></Route>
                {resultForm}
            </div>
        )
    }
    
}

export default Body;
