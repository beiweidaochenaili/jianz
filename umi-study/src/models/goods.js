import axios from "axios"

//调用接口本应该写在servicer,但是由于这里演示就放在model
function getGoods(){
    return axios.get("/api/goods")
}



export default {
    namepace:'goods',//model的命名空间,区分多个model
    state:[],//初始状态
    effects:{
        *getList(action,{call,put}){
            const res=yield call(getGoods)
            yield put({type:"initGoods",payload:res.data.result})
        }
    },//异步操作
    reducers:{
        initGoods(state,action){
            return action.payload
        },
        //添加商品
        addGoods(state,action){
            return [...state,{title:action.payload.title}]
        }
    }
}