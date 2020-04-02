import React, { Component } from 'react'
import "./index.css"
import { Upload, Button, message, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';
import { Link } from 'react-router-dom';
import axios from "axios"
export default class Advertising extends Component {
    state = {
        fileList: [],
        uploading: false,
        newimg_url:''
       
      };
    
      handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        console.log(this.state.newimg_url)
        fileList.forEach(file => {
          formData.append('files[]', file);
        });
        formData.append("newimg_url",this.state.newimg_url)
        this.setState({
          uploading: true,
        });
        
        axios.post("https://www.mocky.io/v2/5cc8019d300000980a055e76",formData).then(
          res=>{
            console.log(res)
            if(res.status==200){
              message.success("发送请求成功")
              this.setState({
                fileList:[],
                newimg_url:'',
                uploading:false
              })
            }
          }
        ).catch(
          err=>{
            message.error("发送请求失败")
          }
        )

        // You can use any AJAX library you like
        // reqwest({
        //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        //   method: 'post',
        //   processData: false,
        //   data: formData,
        //   success: () => {
        //     this.setState({
        //       fileList: [],
        //       newimg_url:'',
        //       uploading: false,
        //     });
        //     message.success('upload successfully.');
        //   },
        //   error: () => {
        //     this.setState({
        //       uploading: false,
        //     });
        //     message.error('upload failed.');
        //   },
        // });
        
      };
      onFocuschange =()=>{
        this.setState({
          newimg_url:"/"
        })

      }
    newimgurlchange =(e)=>{
      this.setState({
        newimg_url:e.target.value
      })
    }
    render() {
        const { uploading, fileList,newimg_url } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <div>
                <h1 > 广告管理</h1>

                <Button type='primary' className="backbtn">
                    <Link to="/home/pageview">
                        返回
                    </Link>
                    
                </Button>
                <br />
                <Upload {...props}>
                    <Button style={{ marginTop: 15 }} type="primary">
                        Upload
                    </Button>
                </Upload>
                <Input style={{width:300,marginRight:15}} onFocus={this.onFocuschange} placeholder="请输入点击跳转路径" value={newimg_url} onChange={this.newimgurlchange}/>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={  fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </div>
        )
    }
}
