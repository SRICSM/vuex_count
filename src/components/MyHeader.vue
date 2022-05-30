<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter="add"/>
  </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
  name: "MyHeader",
  // props方法实现子向父传数据（利用函数）
  // props:['addtodo'],
  methods:{
    add(e){
      // 校验数据
      if(!e.target.value) return
      // 将用户的输入包装成一个todo对象
      const todoObj = {id:nanoid(), title:e.target.value, done:false}

      // 子组件接收到父组件的函数，在函数里面传参数，可以实现子组件向父组件传数据
     // this.addtodo(todoObj)

      // 触发自定义事件
      this.$emit('addtodo',todoObj)

      // 清空输入
      e.target.value = ''
    }
  }
}
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>