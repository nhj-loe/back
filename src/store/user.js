import Cookie from "js-cookie"
export default{

    mutations:{
        // 缓存token
        setToken(state,val){
            state.token=val
            // 缓存传过来的token
            Cookie.set('token',val)
        },
        // 清空token
        clearToken(state){
            state.token=''
            Cookie.remove('token')
        },
        // 获取token
        getToken(state){
            state.token=state.token||Cookie.get('token')
        }
    },
    state:{
        token:''
    },
}