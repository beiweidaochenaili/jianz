import React, { Component } from "react";
import styles from "./login.css";
import { Login } from "ant-design-pro";
import logo from "../../../public/logo.png"
import {connect,routerRedux  } from "dva"
import { message } from "antd"
import axios from "axios"
import Redirect from 'umi/redirect'
const { UserName, Password, Submit } = Login;

@connect()
export default class extends Component {

 onSubmit = (err, values) => {
 console.log("⽤户输⼊：", values,err);
 if(!err){
       this.props.dispatch({type:"user/login",payload:values})
     }


 };
 render() {
 return (
 <div className={styles.loginForm}>
 {/* logo */}
        <img
        className={styles.logo}
        src={logo}
 />
 {/* 登录表单 */}
 <Login onSubmit={this.onSubmit}>
 <UserName
 name="uname"
 placeholder="xiaod"
 rules={[{ required: true, message: "请输⼊⽤户名" }]}
 />
 <Password
 name="password"
 placeholder="123456"
 rules={[{ required: true, message: "请输⼊密码" }]}
 />
 <Submit>登录</Submit>
 </Login>
 </div>
 );
 }
}
