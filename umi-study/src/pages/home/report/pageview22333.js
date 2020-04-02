
import style from './pageview.css';
import { Button,Input,Icon,Select,Row,Col,Checkbox } from "antd"
import { Editor } from "react-draft-wysiwyg"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjs from 'draftjs-to-html'
const { Option }=Select
const { TextArea } = Input
export default class Pageview extends React.Component {
  state={
    vals:"",
    count:'',
    placehoder:'请输入电话号码',
    number:'',
    editorState:'',
    editorState:''
  }
  salarychange =(val)=>{
    console.log(val)
    this.setState({
      vals:val
    })
  }
  setsalary =(e) =>{
    console.log(e.target.value)
    this.setState({
      vals:e.target.value
    })
  }
  countchange =(val)=>{
    console.log(val)
    this.setState({
      count:val
    })
  }
  setcount =(e) =>{
    console.log(e.target.value)
    this.setState({
      count:e.target.value
    })
  }
  phonenumber=(e)=>{
    console.log(e)
    // console.log(e.target)
   this.setState({
     placehoder:`请输入${e}号码`
   })
  }
  onEditorChange = (editorContent) => {
    this.setState({
        editorContent,
    });
};

onEditorStateChange = (editorState) => {
    this.setState({
        editorState
    });
};
onEditorChange2 = (editorContent2) => {
  this.setState({
      editorContent2,
  });
  console.log(draftjs(this.state.editorContent2))
};

onEditorStateChange2 = (editorState2) => {
  this.setState({
      editorState2
  });
};
changeworkname = (e) =>{
  console.log(e.target.value)
}
jiesuan = (e) =>{
  console.log(e)
}
setplace = (e) =>{
  console.log(e)
}
numberchange = (e) =>{
console.log(e.target.value)
this.setState({
  number:e.target.value
})
}
enter =()=>{
  
}
  render(){
    const { editorContent, editorState } = this.state;
    const { editorContent2, editorState2 } = this.state;
  return (
    <div >
      <h1>发布岗位</h1>
      <Row className={style.workname}>
        <Col md={{span:3}} lg={{span:2}}>职位名称:</Col>
        <Col md={{span:6}} lg={{span:6,}}><Input placeholder="例如:服务员,行政" allowClear onChange={(e)=>{this.changeworkname(e)}}/></Col>
       
      </Row>
      <Row style={{marginTop:15}}>
        <Col md={{span:3}} lg={{span:2}}>工资待遇:</Col>
        <Col md={{span:6}} lg={{span:6,}}> <Input placeholder="薪资待遇" value={this.state.vals} onChange={(e)=>{this.setsalary(e)}} allowClear/></Col>
        <Col md={{span:6}} lg={{span:6,}}> 
        <Select defaultValue="1000-2000" style={{width:120,marginLeft:20}} onChange={(e)=>{this.salarychange(e)}}>
            <Option value="3000-5000">3000-5000</Option>
            <Option value="1000-2000">1000-2000</Option>
            <Option value="5000-8000">5000-8000</Option>
           
          </Select>
        </Col>
      </Row>
      <Row style={{marginTop:15}}>
        <Col md={{span:3}} lg={{span:2}}>结算方式:</Col>
        <Col md={{span:6}} lg={{span:6,}}>
        <Select defaultValue="月结" style={{width:120}}  onChange={e=>{this.jiesuan(e)}}>
            <Option value="日结">日结</Option>
            <Option value="周结">周结</Option>
            <Option value="月结">月结</Option>
           
          </Select>
        </Col>
      </Row>
      <Row style={{marginTop:15}}>
        <Col md={{span:3}} lg={{span:2}}>地点范围:</Col>
        <Col md={{span:6}} lg={{span:6,}}>
        <Select defaultValue="不限" style={{width:120}} onChange={e=>{this.setplace(e)}}>
            <Option value="北京">北京</Option>
            <Option value="上海">上海</Option>
            <Option value="广州">广州</Option>
           
          </Select>
        </Col>
      </Row>
      <Row style={{marginTop:15}}>
        <Col md={{span:3}} lg={{span:2}}>招聘人数:</Col>
        <Col md={{span:6}} lg={{span:2,}}> <Input placeholder="例如:1" value={this.state.count} onChange={(e)=>{this.setcount(e)}} allowClear/></Col>
        <Col md={{span:6}} lg={{span:6,}}> 
        <Select defaultValue="1" style={{width:120,marginLeft:20}} onChange={(e)=>{this.countchange(e)}}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="若干">若干</Option>
           
          </Select>
        </Col>
      </Row>
      <Row style={{marginTop:15}}>
        <Col md={{span:3}} lg={{span:2}}>联系方式:</Col>
        <Col md={{span:6}} lg={{span:6,}}> <Input placeholder={this.state.placehoder} value={this.state.number} onChange={e=>{this.numberchange(e)}} allowClear/></Col>
        <Col md={{span:6}} lg={{span:6,}}> 
        <Select defaultValue="电话" style={{width:120,marginLeft:20}}  onChange={(e)=>{this.phonenumber(e)}} >
            <Option value="电话">电话</Option>
            <Option value="微信">微信</Option>
            <Option value="QQ">QQ</Option>
           
          </Select>
        </Col>
      </Row>
      <Row style={{marginTop:15}}>
      <Col md={{span:3}} lg={{span:2}}>职位描述:</Col>
      </Row>
      <div className={style.richtext}>
      <Editor
          editorState={editorState}
          onContentStateChange={this.onEditorChange}
          onEditorStateChange={this.onEditorStateChange}
          
      />
      </div>
      {/* <TextArea rows={4} style={{width:600,marginTop:15}}></TextArea> */}
      <Row style={{marginTop:15}}>
      <Col md={{span:3}} lg={{span:2}}>公司简介:</Col>
      </Row>
      <div className={style.richtext}>
      <Editor
          editorState={editorState2}
          onContentStateChange={this.onEditorChange2}
          onEditorStateChange={this.onEditorStateChange2}
          
      />
      </div>
      <Row style={{marginTop:15}}>
        <Checkbox>热门推荐</Checkbox>
        <Checkbox>简单易做</Checkbox>
      </Row>
      <Row style={{marginTop:15}}>
        <Button type="primary" size='large' style={{width:100}} onClick={this.enter}> 确认发布</Button>
        <Button type="primary" size='large' style={{marginLeft:15,width:100}}>取消</Button>
      </Row>
      {/* <div>
        {draftjs(this.state.editorContent)}
      </div> */}
    </div>
  );
}
}



