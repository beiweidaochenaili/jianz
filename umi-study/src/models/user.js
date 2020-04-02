import axios from 'axios'
import router from 'umi/router'
// JSON.parse(localStorage.getItem("userinfo") ) ||
let inituserinfo = JSON.parse(localStorage.getItem("userinfo") ) ||  {
    token:'',
    role:'',
    uname:''
}


//api请求 接口调用
function login (data){
    return axios.post('http://127.0.0.1:8888/login/htlogin',data)
}

export default {
    namespace:"user",//命名空间可省略,省略了就拿文件名做命名空间
    state:inituserinfo,
    effects:{//异步操作
        *login(action,{put,call}){
            try {
            const res= yield call(login,action.payload)
            console.log(res)
            console.log(res.data.data)
            if(res.data.code==200){
                //登录成功,要把用户信息做缓存
                localStorage.setItem('userinfo',JSON.stringify(res.data.data))
                yield put({type:'init',payload:res.data.data})
                router.push("/")//登录成功,跳转至首页
            }
            } catch (error) {
                alert('登录失败,账号或密码错误')
            }
            
        },
        //退出登录
        *logout(action ,{put,call}){
            //清除本地存储信息
            localStorage.removeItem("userinfo")
            yield put({type:"out"})
            router.push('/login')
        }
    },
    reducers:{
        init(state,action){
            return action.payload
        },
        out(state,action){
            return inituserinfo
        }
    }
}