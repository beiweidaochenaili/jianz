import React, { Component } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import axios from "axios"
const { Item } = Form
const { Option } = Select

class SetTitlemodalfather extends Component {
    constructor(props) {
        super(props);
        // this.state={
        //     Iid:
        // }
    }

    //提交方法
    onOk = () => {
        const { form, addSubmit } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            console.log(fieldsValue);
            const dataval = this.props.dataval

            // console.log(dataval)
            const { lid } = dataval
            const newtitleval = { ...fieldsValue, lid }
            // addSubmit(fieldsValue); //提交数据
            axios.post("http://127.0.0.1:8888/list/updata",newtitleval).then(res=>{
                console.log(res)
                if (res.data.code==200){
                    message.success("修改成功")
                    this.props.changevisible(false) 
                    
                }else{
                    message.error("修改失败")
                }
            }).catch(err=>{
                console.log(err)
            })

        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const dataval = this.props.dataval
        console.log(dataval)
        return (
            <div>
                <Modal
                    title="编辑职位"
                    visible={this.props.visibles}
                    onOk={this.onOk}
                    onCancel={() => { this.props.changevisible(false) }}
                >
                    {/* <TitleForm dataval={this.props.dataval}></TitleForm> */}
                    <Form>
                        <Item label="职位名称">
                            {getFieldDecorator('title', {
                                initialValue: dataval.title,
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
                                initialValue: dataval.salary,
                                rules: [
                                    {


                                    }
                                ]
                            })(
                                <Input placeholder="请输入工资待遇" style={{ width: 300 }}></Input>
                            )
                            }
                        </Item>
                        <Item label="地点范围">
                            {getFieldDecorator('locations', {
                                initialValue: dataval.locations,
                                rules: [
                                    {
                                        required: true,
                                        message: '地点范围不能为空'
                                    }
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

                        <Item label="联系方式">
                            {
                                getFieldDecorator('list_zh', {
                                    initialValue: dataval.list_zh,
                                    rules: [
                                        {
                                            required: true,
                                            message: '联系不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="如果有多个联系方式请用/隔开" style={{ width: 300 }}></Input>
                                )
                            }
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

// class SetTitlemodal extends Component {
//     state = {

//     }

//     render() {
//         const { getFieldDecorator } = this.props.form
//         const dataval = this.props.dataval
//         console.log(dataval)
//         return (
//             <div>


//                     <Form>
//                         <Item label="职位名称">
//                             {getFieldDecorator('title', {
//                                 initialValue: dataval.title,
//                                 rules: [
//                                     {
//                                         required: true,
//                                         message: '用户名不能为空'
//                                     }
//                                 ]
//                             })(
//                                 <Input placeholder="例如：服务员" style={{ width: 300 }}></Input>
//                             )
//                             }
//                         </Item>

//                         <Item label="工资待遇">
//                             {getFieldDecorator('salary', {
//                                 initialValue:dataval.salary,
//                                 rules: [
//                                     {


//                                     }
//                                 ]
//                             })(
//                                 <Input placeholder="请输入工资待遇" style={{ width: 300 }}></Input>
//                             )
//                             }
//                         </Item>
//                         <Item label="地点范围">
//                             {getFieldDecorator('locations', {
//                                 initialValue: dataval.locations,
//                                 rules: [
//                                     {
//                                         required: true,
//                                         message: '地点范围不能为空'
//                                     }
//                                 ]
//                             })(
//                                 <Select style={{ width: 300 }}>
//                                     <Option value="北京">北京</Option>
//                                     <Option value="上海">上海</Option>
//                                     <Option value="天津">天津</Option>
//                                 </Select>
//                             )
//                             }

//                         </Item>

//                         <Item label="联系方式">
//                             {
//                                 getFieldDecorator('list_zh', {
//                                     initialValue: dataval.list_zh,
//                                     rules: [
//                                         {
//                                             required: true,
//                                             message: '联系不能为空'
//                                         }
//                                     ]
//                                 })(
//                                     <Input placeholder="如果有多个联系方式请用/隔开" style={{ width: 300 }}></Input>
//                                 )
//                             }
//                         </Item>
//                     </Form>

//             </div>
//         )
//     }
// }
// const TitleForm= Form.create({})(SetTitlemodal)

export default SetTitlemodalfather = Form.create({})(SetTitlemodalfather);
