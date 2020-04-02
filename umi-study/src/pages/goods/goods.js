import {connect } from "dva"
import React,{Component} from "react"
import styles from './goods.css'
import {Card,Button} from "antd"
@connect (
  state=>({
    goodsList:state.goods,//获取指定命名空间里面的state
    loading:state.loading//通过loading命名空间拿到我们的加载状态
  
  }
  
  ),

  {
    getList:()=>({
      type:"goods/getList" ,   //action的type是需要命名空间前缀+我们的reducer
    
    }),
    addGoods:title=>({
      type:"goods/addGoods",
      payload:{title}
    })
    
  }
)
export default class extends Component{
  componentDidMount(){
    this.props.getList()
    
  }
  render(){
    if (this.props.loading.models.goods){
      return <div>加载中...</div>
    }
    return (
      <div className={styles.normal}>
        <h1>page goods</h1>
        {/* 商品列表 */}
        <div className="detaillist">
          <h1>商品列表</h1>
          {
            this.props.goodsList.map((good,index)=>{
              console.log(good)
              return  <Card key={index} title={`课程${index+1}`}>
                  <div>{good.title}</div>
                </Card>
              
            })
          }
        </div>
        <Button type="primary" onClick={()=>this.props.addGoods("商品")}>添加商品</Button>
      </div>
    )
  }
}