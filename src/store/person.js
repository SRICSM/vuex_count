//准备人员列表相关的配置 vuex模块化写法
import axios from 'axios'
import { nanoid } from 'nanoid'

export default {
    //开启命名空间，可以在（map...)这样的函数里面使用命名空间
    namespaced: true,
    actions: {
        addPersonWang(context, value) {
            if (value.name.indexOf('王') === 0) {
                context.commit('ADD_PERSON', value)
            } else {
                alert('添加的人必须姓王！')
            }
            console.log('actions里面的addPersonWang被调用了！', context, value)
        },
        addPersonServer(context) {
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                response => {
                    context.commit('ADD_PERSON', { id: nanoid(), name: response.data })
                },
                error => {
                    alert(error.message)
                }
            )
        }
    },
    mutations: {
        ADD_PERSON(state, value) {
            console.log('mutations里面的加一个人被调用了！', state, value)
            state.personList.unshift(value)
        }
    },
    state: {
        personList: [
            { id: '001', name: '张三', age: 18 },
        ]
    },
    // getters: {
    //     bigSum(state) {
    //         //需要写返回值
    //         return state.sum * 10
    //     }
    // }
}