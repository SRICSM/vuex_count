<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox" :checked="isAll" @change="checkAll"/>
    </label>
    <span>
          <span>已完成{{ donetotal }}</span> / 全部{{ total }}
        </span>
    <button class="btn btn-danger" @click="cleanAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",

  // props: ['todos','checkAllTodo','cleanAllTodo'],
  // 利用自定义事件
  props: ['todos'],
  methods:{
    checkAll(e){
      // this.checkAllTodo(e.target.checked)

      // 利用自定义事件
      this.$emit('checkAllTodo',e.target.checked)
    },
    cleanAll(e){
      // this.cleanAllTodo(e.target.checked)

      // 利用自定义事件
      this.$emit('cleanAllTodo',e.target.checked)
    }
  },

  computed: {
    total() {
      return this.todos.length
    },
    // 简写计算属性 简写(对应不修改的对象)  省略set
    donetotal() {
      // 数组长度为reduce函数调用的次数  reduce函数两个参数，一个是回调函数，一个是累计初始值
      // pre	必需   初始值, 或者计算结束后的返回值。
      // current	必需   当前元素
      // 也可以把回调函数写到外面去
      return this.todos.reduce((pre, current) => {
        return pre + (current.done ? 1 : 0)
      }, 0)
    },
    // 一个计算属性允许用其他的计算属性进行计算
    isAll() {
      return this.donetotal === this.total && this.total > 0
    }
  }
}
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>