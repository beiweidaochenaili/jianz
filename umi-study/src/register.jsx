/**
 * @Descriptions: 描述
 * @Author: Jess
 * @Date: 2019-04-22 20:19:57
 * @PrevEditor: Jess
 * @PrevEditTime: 2019-04-22 20:19:57
 * @LastEditor: Jess
 * @LastEditTime: 2019-04-22 20:19:57
 */

import React, { Component, Fragment } from "react";
import CssModules from 'react-css-modules'
import styles from "./register.less";
import { MainView, BodyView, ContentView } from "@gc";
import { inject, observer } from "mobx-react";
import { register, service } from "@g/actions";
import { ToBackPage, getUrlParamsToJson } from "@g/utils/framework";
@inject("router", "global")
@observer
@CssModules(styles, { allowMultiple: true })
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.newState = new register();
    this.service = new service();
  }

  handleSiblingsClick = () => {
    this.newState.activeType = !this.newState.activeType
  }

  UNSAFE_componentWillMount() {
    this.newState.onInit();
    this.service.onInit();
  }

  componentWillUnmount() {
    this.newState = null;
    this.service = null;
  }

  // 渲染启用填写字段
  renderEnabledFiled(index) {
    const enableFields = this.newState.enableFields[index];

    let htmlArr = [];
    htmlArr.push(
      <div key={0}>
        <i styleName="psaaword1"></i>
        <input
          styleName="psaaword"
          type="password"
          placeholder="密码"
          onFocus={this.newState.onfocusPwd}
          onBlur={this.newState.onblurPwd}
          onChange={this.newState.onFillUserPassword}
        />
        <span style={{ display: this.newState.focusPwd ? 'block' : 'none' }}>请输入6-12位字母和数字</span>
      </div>
    );
    htmlArr.push(
      <div key={1}>
        <i styleName="psaaword1"></i>
        <input
          styleName="psaaword"
          type="password"
          placeholder="请再次确认密码"
          onChange={this.newState.onFillConfirmPwd}
        />
      </div>
    );
    if (enableFields.telRegedit - 0 === 1 && index != 2) {
      htmlArr.push(
        <div key={2}>
          <i styleName="tel"></i>
          <input
            styleName="phone"
            type="number"
            placeholder="手机号"
            onChange={this.newState.onFillTelephone}
          />
          {/* <span style={{ display: this.newState.focus ? 'block' : 'none' }}>手机号必须是11位数字</span> */}
        </div>
      );
    }
    if (enableFields.nameRegedit - 0 === 1) {
      htmlArr.push(
        <div key={3}>
          <i styleName="name"></i>
          <input
            styleName="account"
            type="text"
            placeholder="真实姓名"
            onChange={this.newState.onFillUserName}
          />
          {/* <span style={{ display: this.newState.focus ? 'block' : 'none' }}>姓名必须是中文</span> */}
        </div>
      );
    }
    if (enableFields.wxRegedit - 0 === 1) {
      htmlArr.push(
        <div key={4}>
          <i styleName="wx"></i>
          <input
            styleName="account"
            type="text"
            placeholder="微信号码"
            onChange={this.newState.onFillUserWX}
          />
          {/* <span style={{ display: this.newState.focus ? 'block' : 'none' }}>微信号不能为空</span> */}
        </div>
      );
    }
    if (enableFields.qqRegedit - 0 === 1) {
      htmlArr.push(
        <div key={5}>
          <i styleName="qq"></i>
          <input
            styleName="account"
            type="number"
            placeholder="QQ号码"
            onChange={this.newState.onFillUserQQ}
          />
          {/* <span style={{ display: this.newState.focus ? 'block' : 'none' }}>QQ号不能为空</span> */}
        </div>
      );
    }
    if (enableFields.emailRegedit - 0 === 1) {
      htmlArr.push(
        <div key={6}>
          <i styleName="mail"></i>
          <input
            styleName="account"
            type="text"
            placeholder="电子邮箱"
            onChange={this.newState.onFillEmail}
          />
          {/* <span style={{ display: this.newState.focus ? 'block' : 'none' }}>电子邮箱不能为空</span> */}
        </div>
      );
    }
    return htmlArr;
  }

  // 渲染注册方式
  renderRegistration() {
    const { enableFields } = this.newState;
    if (enableFields && enableFields.length > 0) {
      return (
        <div styleName="navbar">
          <div styleName={this.newState.activeType ? 'navbar-d' : 'active navbar-d'} onClick={this.handleSiblingsClick}>手机号注册</div>
          <div styleName={this.newState.activeType ? 'navbar-d active' : 'navbar-d'} onClick={this.handleSiblingsClick}>账号注册</div>
        </div>
      )
    }
    return null;
  }

  // 渲染账号注册
  renderAccountRegistration() {
    const { router, global } = this.props;
    const query = getUrlParamsToJson();
    if (this.newState.enableFields) {
      if (this.newState.enableFields[1] && this.newState.enableFields[1].isClose == 0) {
        return (
          <div styleName="content_ipt">
            <div>
              <i styleName="user"></i>
              <input type="text"
                placeholder="用户名"
                styleName="account"
                onFocus={this.newState.onfocusName}
                onBlur={this.newState.onblurName}
                onChange={this.newState.onFillUserAccount} />
              <span style={{ display: this.newState.focusName ? 'block' : 'none' }}>用户名必须是6-15位的字母或数字</span>
            </div>
            {this.renderEnabledFiled(1)}
            <div style={{ 'display': this.newState.proxyCode1 == 1 ? 'block' : 'none' }}>
              <i styleName="proxy"></i>
              <input type="text"
                placeholder={this.newState.registerInfo.proxyLinkCode ? this.newState.registerInfo.proxyLinkCode : '邀请码'}
                disabled={query.proxyAccount || window.proxyAccount ? 'disabled' : ''}
                styleName="account"
                onChange={this.newState.onFillProxyLinkCode}
              />
            </div>
            <div styleName="list">
              <i styleName="verification"></i>
              <input
                maxLength="4"
                type="text"
                styleName="code"
                placeholder="验证码"
                onChange={this.newState.onFillvalidCode}
              />
              <img
                styleName="img"
                src={`${"data:image/jpeg;base64,"}${
                  this.newState.verifyCodeImg
                  }`}
                onClick={this.newState.onRefreshCode}
                alt=""
              />
            </div>
            <div styleName="res"
              disabled={this.newState.isDisable}
              onClick={this.newState.onUserRegister.bind(
                this,
                global,
                router
              )}>
              <em>注册</em>
            </div>
          </div>

        )
      }
    }
    return null;
  }

  // 渲染手机号注册
  renderPhoneRegistration() {
    const { router, global } = this.props;
    const query = getUrlParamsToJson();
    if (this.newState.enableFields) {
      if (this.newState.enableFields[2] && this.newState.enableFields[2].isClose == 0) {
        return (
          <div styleName="content_ipt">
            <div>
              <i styleName="tel"></i>
              <input type="number"
                placeholder="手机号"
                styleName="phone"
                onFocus={this.newState.onfocusName}
                onBlur={this.newState.onblurName}
                onChange={(e) => {
                  this.newState.onFillTelephone(e)
                  this.newState.onFillUserAccount(e)
                }} />
              <span style={{ display: this.newState.focusName ? 'block' : 'none' }}>手机号必须是11位数字</span>
            </div>
            {this.renderEnabledFiled(2)}
            <div style={{ 'display': this.newState.proxyCode2 == 1 ? 'block' : 'none' }}>
              <i styleName="proxy"></i>
              <input type="text"
                placeholder={this.newState.registerInfo.proxyLinkCode ? this.newState.registerInfo.proxyLinkCode : '邀请码'}
                disabled={query.proxyAccount || window.proxyAccount ? 'disabled' : ''}
                styleName="account"
                onChange={this.newState.onFillProxyLinkCode}
              />
            </div>
            <div styleName="list">
              <i styleName="verification"></i>
              {this.newState.phoneVerificationType === 1 ? <Fragment>
                <input type="number"
                  placeholder="验证码"
                  styleName="code"
                  onChange={
                    (e) => {
                      this.newState.onFillvalidCode(e)
                      this.newState.onPhoneCode(e)
                    }} />
                <b styleName={this.newState.phoneIsSend ? "btn_c btn_c2" : "btn_c btn_c1"}
                  onClick={this.newState.phoneIsSend ? null : this.newState.onGetPhoneSms.bind(this, this.newState.registerInfo.userAccount)}
                >
                  {this.newState.phoneCodeTxt}
                </b>
              </Fragment> : <Fragment>
                  <input
                    maxLength="4"
                    type="text"
                    styleName="code"
                    placeholder="验证码"
                    onChange={this.newState.onFillvalidCode}
                  />
                  <img
                    styleName="img"
                    src={`${"data:image/jpeg;base64,"}${
                      this.newState.verifyCodeImg
                      }`}
                    onClick={this.newState.onRefreshCode}
                    alt=""
                  />
                </Fragment>}
            </div>
            <div styleName="res"
              disabled={this.newState.isDisable}
              onClick={this.newState.onUserRegister.bind(
                this,
                global,
                router
              )}>
              <em>注册</em>
            </div>
          </div>
        )
      }
    }
    return null;
  }

  // 渲染注册通道关闭
  renderRegistrationClose() {
    const { webConfigData } = this.service;
    const { router } = this.props;
    return (
      <div styleName="close">
        <img styleName="closeimg" src={require("@/assets/images/close404.png")} alt=''></img>
        <p styleName="close1">抱歉！暂时无法注册</p>
        <p styleName="close2">你可以</p>
        <div styleName="stroll" onClick={router.popToRootView}>先去逛一下</div>
        <p styleName="close3">or</p>
        <div styleName="contact" onClick={() => this.props.router.onToGoServerView(webConfigData.onlineCustomerUrl)}>联系客服</div>
      </div>
    )
  }

  //渲染注册通道显示内容
  renderViews = () => {
    return (
      <Fragment>
        {/* 判断注册通道Tab栏是否存在 */}
        {(this.newState.enableFields[1].isClose == 0 && this.newState.enableFields[2].isClose == 0) ? this.renderRegistration() : null}
        {/* 判断账号注册通道是否存在 */}
        {(this.newState.enableFields[1].isClose == 0) ? (this.newState.activeType ? this.renderAccountRegistration() : null) : null}
        {/* 判断手机注册通道是否存在 */}
        {(this.newState.enableFields[2].isClose == 0) ? (this.newState.activeType ? null : this.renderPhoneRegistration()) : null}
      </Fragment>)
  }

  render() {
    const { router } = this.props;
    if (this.newState.enableFields && this.newState.enableFields.length != 0) {
      return (
        <MainView backPage={this.newState.backPage}>
          <BodyView>
            <ContentView>
              <div styleName="qd">
                <div styleName="main">
                  <div styleName="info">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div styleName="card">
                    <div styleName="return" onClick={() => {
                      this.newState.onBackPage();
                      ToBackPage(function () {
                        router.popView();
                      });
                    }}>
                      <div styleName="icon">
                        <img src={require("@/assets/images/return.png")} alt='' />
                        <span>返回登录</span>
                      </div>
                    </div>
                    <div styleName="res-d">
                      <div styleName="detail">
                        {/* 注册通道是否关闭 */}
                        {(this.newState.enableFields[1].isClose == 1 && this.newState.enableFields[2].isClose == 1) ? this.renderRegistrationClose() : this.renderViews()}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </ContentView>
          </BodyView>
        </MainView>
      );
    }
  }
}
