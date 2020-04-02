
import style from './pageview.css';
import { Button, Input, Icon, Select, Row, Col, Checkbox, Form, InputNumber,message } from "antd"
import { Editor } from "react-draft-wysiwyg"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjs from 'draftjs-to-html'
import axios from "axios"

const { Option } = Select
const { TextArea } = Input
const { Item } = Form


class Pageview extends React.Component {
  state = {
    editorState: '',
    editorState2: '',
    editorContent2:'',
    editorContent:''
  }
  onEditorChange = (editorContent) => {
    let value= draftjs(editorContent)
    
    
    this.setState({
      editorContent:value,
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };
  onEditorChange2 = (editorContent2) => {
    let val= draftjs(editorContent2)
    
    
    this.setState({
      editorContent2:val,
    });
 
  };

  onEditorStateChange2 = (editorState2) => {
    this.setState({
      editorState2
    });
  };

  //===========提交表单数据===========
  handlesubmit =()=>{
    let userinfo= this.props.form.getFieldsValue();
    const { form } = this.props;
    console.log(form)
    // console.log(userinfo)
    axios.post("http://127.0.0.1:8888/list/addlist",userinfo).then(res=>{
      console.log(res)
      if(res.data.code==200){
        message.success("添加成功")
        form.resetFields();
      }else{
        message.error("添加失败")
      }
      
    }).catch(err=>{
      console.log(err)
      message.error("提交失败")
    })
  }
  render() {
    const { editorContent2, editorState2 } = this.state;
    const { editorContent, editorState } = this.state;
    const { getFieldDecorator } = this.props.form
    return (
      <div >
        <h1>发布岗位</h1>
        <Form  >
          <Item label="职位名称" style={{display:"block"}}>
            {getFieldDecorator('title', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '用户名不能为空'
                }
              ]
            })(
              <Input placeholder="例如：服务员" style={{ width: 300 }}></Input>
            )
            }

          </Item>
          <Item label="工资待遇">
            {getFieldDecorator('salary', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '工资待遇不能为空'
                }
              ]
            })(
              <Input placeholder="" style={{ width: 300 }}></Input>
            )
            }

          </Item>
          <Item label="结算方式">
            {getFieldDecorator('Settlement', {
              initialValue: '月结',
              rules: [

              ]
            })(
              <Select style={{ width: 300 }}>
                <Option value="日结">日结</Option>
                <Option value="月结">月结</Option>
                <Option value="周结">周结</Option>
              </Select>
            )
            }

          </Item>
          <Item label="地点范围">
            {getFieldDecorator('locations', {
              initialValue: '北京',
              rules: [

              ]
            })(
              <Select style={{ width: 300 }}>
                <Option value="北京">北京</Option>
                <Option value="上海">上海</Option>
                <Option value="天津">天津</Option>
              </Select>
            )
            }

          </Item>
          <Item label="招聘人数">
            {getFieldDecorator('People', {
              initialValue: '1',
              rules: [

              ]
            })(
              <Select style={{ width: 300 }}>
                <Option value="1">1</Option>
                <Option value="2-4">2-4</Option>
                <Option value="若干">若干</Option>
              </Select>
            )
            }

          </Item>
          <Item label="联系方式">
            {getFieldDecorator('list_zh', {
              initialValue: '',
              rules: [
                {

                  required: true,
                }
              ]
            })(
              <Input placeholder="请输入联系方式" style={{ width: 300 }} />
            )
            }

          </Item>
          <Item label="职位描述">
            {getFieldDecorator('workdesc', {
              initialValue:editorContent,
              rules: [

              ]
            })(
              <div className={style.richtext}>
                <Editor
                  editorState={editorState}
                  onContentStateChange={this.onEditorChange}
                  onEditorStateChange={this.onEditorStateChange}

                />
              </div>
            )
            }

          </Item>
          <Item label="公司简介">
            {getFieldDecorator('companyintr', {
              initialValue: editorContent2,
              rules: [

              ]
            })(
              <div className={style.richtext}>
                <Editor
                  editorState={editorState2}
                  onContentStateChange={this.onEditorChange2}
                  onEditorStateChange={this.onEditorStateChange2}

                />
              </div>
            )
            }

          </Item>
          <Item label="">
            {getFieldDecorator('hot', {
              initialValue: "",
              rules: [

              ]
            })(
              <div>

                <Checkbox>热门推荐</Checkbox>
              </div>
            )
            }

          </Item>
          <Item label="">
            {getFieldDecorator('Gabroad', {
              initialValue: "",
              rules: [

              ]
            })(
              <div>

                <Checkbox>简单易做</Checkbox> 
              </div>
            )
            }

          </Item>
        </Form>
        <div>
          <Button style={{ width: 100 }} type="primary" onClick={this.handlesubmit}>确认发布</Button>
          <Button style={{ width: 100, marginLeft: 15 }} type="primary">取消</Button>
        </div>
      </div>
    )
  }
}
export default Form.create({})(Pageview)