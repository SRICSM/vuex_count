//准备求和相关的配置 vuex模块化写法
export default {
    //开启命名空间，可以在（map...)这样的函数里面使用命名空间
    namespaced: true,
    actions: {
        // value : dispatch传过来的数据   context:上下文对象
        // jia(context, value) {
        //     console.log('actions里面的加被调用了！', context, value)
        //     context.commit('JIA', value)
        // },
        // jian(context, value) {
        //     // 里面需要调用commit函数，提交给mutations
        //     console.log('actions里面的减被调用了！', context, value)
        //     context.commit('JIAN', value)
        // },
        jiaOdd(context, value) {
            // 里面需要调用commit函数，提交给mutations
            console.log('actions里面的加jiaOdd被调用了！', context, value)
            if (context.state.sum % 2) {
                context.commit('JIA', value)
            }
        },
        jiaWait(context, value) {
            console.log('actions里面的加 jiaWait被调用了！', context, value)
            setTimeout(() => {
                context.commit('JIA', value)
            })
        },
    },
    mutations: {
        JIA(state, value) {
            console.log('mutations里面的加被调用了！', state, value)
            state.sum += value
        },
        JIAN(state, value) {
            console.log('mutations里面的减被调用了！', state, value)
            state.sum -= value
        },
    },
    state: {
        sum: 0,//当前的和
        school: '湖北民族大学',
        subject: '数字媒体技术',
    },
    getters: {
        bigSum(state) {
            //需要写返回值
            return state.sum * 10
        }
    }
}