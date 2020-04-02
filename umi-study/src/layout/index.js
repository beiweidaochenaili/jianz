import React, { Component } from 'react'
import  style from "./index.css"

import { Layout, Menu, Breadcrumb, Icon,Dropdown,Avatar } from "antd"
import {Link} from "react-router-dom"
import MenuList from "../../mock/menuList"
import {connect} from "dva"
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
@connect(
    state=>({
        userinfo:state.user
    }),
    {
        logout:()=>({type:'user/logout'})//派发的是命名空间+reducer
    }
)
export default class Index extends Component {
    state={
        menulist:[],
        collapsed:false
    }
  
    componentDidMount(){
        this.setState({
            menulist:MenuList[0]
        })
    }
   
    //点击一级菜单切换二级菜单
    change = (index) =>{
        this.setState({
            menulist:MenuList[index]
        })
    }
    //二级菜单收缩功能
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
    render() {
        //定义下拉菜单内容
        const menu =(
            <Menu>
                <Menu.Item>个人中心</Menu.Item>
                <Menu.Item onClick={()=>{this.props.logout()}}>退出登录</Menu.Item>
            </Menu>
        )
        // const selectedKeys=[this.props.location.pathname]
        const routename="/"+this.props.location.pathname.split("/")[1]
        console.log(routename)
        const selectedKeys=[routename]
        console.log(selectedKeys)
        return (
            <div className={style.body}>
                <Layout>
                    <Header className={style.header} style={{position: 'fixed',zIndex: 1,width:"100%"}}>
                       
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            // defaultSelectedKeys={['1']}
                            selectedKeys={selectedKeys}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="/home">
                                <Link to="/"  onClick={()=>{this.change(0)}}>首页</Link>
                            </Menu.Item>
                            <Menu.Item key="/about">
                                <Link to='/about' onClick={()=>{this.change(1)}}>关于</Link>
                            </Menu.Item>
                            <Menu.Item key="/goods">
                                <Link to="/goods" onClick={()=>{this.change(2)}}>商品</Link>

                            </Menu.Item>
                        </Menu>
                        <div className={style.users}>
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" href="#">
                                {this.props.userinfo.uname} <Icon type="down"/>
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Layout className={style.content} style={{marginTop: 64 }} >
                         <Sider   collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{height:'100vh'}}    style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}>
                             
                           <Menu
                                // theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '920px', borderRight: 0 }}
                            >
                              
                                {this.state.menulist.map((val)=>{
                                    console.log(val)
                                    return (
                                        <SubMenu
                                    key={val.keyValue}
                                    title={
                                        <span>
                                            <Icon type="user" />
                                            {val.title}
                                        </span>
                                    }
                                   
                                >
                                   {val.children?val.children.map(vals=>(
                                      
                                        <Menu.Item key={vals.keyValue}>
                                            <Link to={vals.routeurl}>{vals.title}</Link>
                                        
                                        </Menu.Item> 
                                      
                                   )):null}
                                </SubMenu>
                                    )
                                })}
                              
                            </Menu>
                        </Sider> 
                   
                        <Layout style={{ padding: '0 24px 24px', marginLeft: 200 }}  >
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content 
                                
                            >
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout> 
            </div>
        )
    }
}





