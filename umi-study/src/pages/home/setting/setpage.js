import React, { Component } from 'react'
import { Button, Table, Modal, Form, message } from "antd"
import './setpage.css'
import axios from 'axios'
import moment from 'moment';

import { func, number } from 'prop-types'
import SetTitlemodal from '../../modal/SetTitlemodal';
import SetTitlemodalfather from '../../modal/SetTitlemodal';
const { Item } = Form
export default class setpage extends Component {
  state = {
    dataSource: [],
    visible: false,
    modalsource: {}

  }

  componentDidMount() {
    this.seachuser()
    // console.log(this.state.modalsource)
  }
  //请求接口的数据
  seachuser = () => {
    axios.get("http://127.0.0.1:8888/user/htgetUse").then(res => {
      console.log(res)

      if (res.data.code == 200) {
        const { data } = res.data
        data.forEach((item, index) => {
          // console.log(item)
          item.seenumber = 2;
          item.givename = 2;
          item.key = index;
          item.action = item.lid;


        })
        // 
        this.setState({
          dataSource: res.data.data
        })

      }
    }).catch(err => {
      console.log(err)
    })
  }

  //控制弹框方法
  handleVilbalModal = (flag) => {
    let val = this.state.dataSource[flag]
    this.setState({
      visible: true,
      modalsource: val
    })
    // console.log(flag)
    console.log("val: ", val)

  }


  changevisible = (e) => {
    this.setState({
      visible: e
    })
  }
  //删除职位
  deletetitle = (e) => {

    console.log(e)
    axios.get('http://127.0.0.1:8888/list/delete', { params: { id: e }, }).then(res => {
      console.log(res)
      if (res.data.code == 200) {
        message.success("删除成功")
        this.seachuser()
      } else {
        message.error("删除失败")
      }
    })

  }

  render() {

    const columns = [
      {
        title: '兼职名称',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
      },
      {
        title: '工资',
        dataIndex: 'salary',
        key: 'salary',
      },
      {
        title: '兼职地点',
        dataIndex: 'locations',
        key: 'locations',
      },
      {
        title: '联系方式',
        dataIndex: 'list_zh',
        key: 'list_zh',
      },
      {
        title: '浏览人数',
        dataIndex: 'seenumber',
        key: 'seenumber',
      },
      {
        title: '报名人数',
        dataIndex: 'givename',
        key: 'givename',
      },
      {
        title: '发布日期',
        dataIndex: 'timer',
        key: 'timer',
        render: (value, record) => {
          return (
            <div>
              {
                value && moment(Number(value)).format('YYYY-MM-DD HH:mm:ss') || '-'
              }
            </div>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (value, e) => {
          //  console.log(value)
          // console.log(e)
          return (
            <div>
              <a style={{ marginRight: 20 }} onClick={() => { this.handleVilbalModal(e.key) }}>编辑</a>
              <a onClick={() => { this.deletetitle(value) }}>删除</a>
            </div>
          )
        }

      }
    ];

    return (
      <div style={{ height: '100vh' }}>
        <h1 >我的发布</h1>

        <hr />
        <Table bordered
          columns={columns}
          pagination={true} style={{ textAlign: "center" }} dataSource={this.state.dataSource}>

        </Table>
        <SetTitlemodalfather visibles={this.state.visible} changevisible={this.changevisible} dataval={this.state.modalsource}></SetTitlemodalfather>
        {/* <Modal
          // title="编辑职位"
          visibles={this.state.visible}
          dataval={this.state.modalsource}
          // onOk={this.updatetitle}
          // onCancel={() => { this.setState({ visible: false }) }}
        >
          {/* <SetTitlemodal dataval={this.state.modalsource}></SetTitlemodal> 
        </Modal> */}

      </div>
    )
  }
}
