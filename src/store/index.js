//该文件用于创建Vuex中最为核心的store
import Vue from "vue";
import Vuex from "vuex";

// 引入相关的vuex配置
import countOptions from "./count";
import personOptions from "./person";
// 使用插件  使用Vuex，vm，vc上面就有store配置项可用
Vue.use(Vuex)

// // 准备actions  用于响应组件中的动作
// const actions = {
//     // value : dispatch传过来的数据   context:上下文对象
//     // jia(context, value) {
//     //     console.log('actions里面的加被调用了！', context, value)
//     //     context.commit('JIA', value)
//     // },
//     jiaOdd(context,value){
//         // 里面需要调用commit函数，提交给mutations
//         console.log('actions里面的加jiaOdd被调用了！', context, value)
//         if(context.state.sum % 2){
//             context.commit('JIA',value)
//         }
//     },
//     jiaWait(context, value){
//         console.log('actions里面的加 jiaWait被调用了！', context, value)
//         setTimeout(()=>{
//             context.commit('JIA',value)
//         })
//     },
//     // jian(context, value) {
//     //     // 里面需要调用commit函数，提交给mutations
//     //     console.log('actions里面的减被调用了！', context, value)
//     //     context.commit('JIAN', value)
//     // },

// }
// // 准备mutations  用于操作数据
// const mutations = {
//     JIA(state, value) {
//         console.log('mutations里面的加被调用了！', state, value)
//         state.sum += value
//     },
//     JIAN(state, value) {
//         console.log('mutations里面的减被调用了！', state, value)
//         state.sum -= value
//     },
//     ADD_PERSON(state, value) {
//         console.log('mutations里面的加一个人被调用了！', state, value)
//         state.personList.unshift(value)
//     }
// }
// // 准备state  用于存储数据
// const state = {
//     sum: 0 ,//当前的和
//     school: '湖北民族大学',
//     subject: '数字媒体技术',
//     personList: [
//         { id: '001', name: '张三', age: 18 },
//     ]
// }
// // 配置getters 
// // 当state中的数据需要经过加工后再使用时，可以使用getters加工
// const getters = {
//     bigSum(state) {
//         //需要写返回值
//         return state.sum * 10
//     }
// }


//创建并暴露store
export default new Vuex.Store({
    modules: {
        countAbout: countOptions,
        personAbout: personOptions
    }
})