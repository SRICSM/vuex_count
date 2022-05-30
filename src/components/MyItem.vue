<template>
  <transition name="todo" , appear>
    <li>
      <label>
        <input type="checkbox" :checked="todo.done" @click="handleCheck(todo.id)"/>
        <span v-show="!todo.isEdit">{{ todo.title }}</span>
        <input
            v-show="todo.isEdit"
            type="text"
            :value="todo.title"
            @blur="handleBlur(todo,$event)"
            ref="inputTitle">
      </label>
      <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
      <!--    编辑的时候不展示编辑按钮-->
      <button class="btn btn-edit" @click="handleEdit(todo)" v-show="!todo.isEdit">编辑</button>
    </li>
  </transition>
</template>

<script>
import pubsub from "pubsub-js";

export default {
  name: "MyItem",
  // 接收从父组件MyList传过来的对象数据
  props: ['todo'],
  mounted() {
    // 利用props传过来的数据会被添加到vc身上
    // console.log(this.todo)
  },
  methods: {
    // 勾选或取消勾选
    handleCheck(id) {
      // this.checkTodo(id)
      this.$bus.$emit('checkTodo', id)
    },
    // 删除
    handleDelete(id) {
      if (confirm("确定删除吗？")) {
        // 通知App找到删除项
        // this.deleteTodo(id)
        // this.$bus.$emit('deleteTodo',id)

        // 发布消息  参数1：消息名   参数2：数据
        pubsub.publish('deleteTodo', id)
      }
    },
    handleEdit(todo) {
      // 给todo添加isEdit属性，并且利用$set，让数据变成响应式
      //  hasOwnProperty：判断一个对象上是否有某个属性
      if (todo.hasOwnProperty('isEdit')) {
        todo.isEdit = true
      } else {
        this.$set(todo, 'isEdit', true)
      }
      // 编辑的时候获取焦点
      // 在下一次 DOM 更新结束后执行其指定的回调
      this.$nextTick(function () {
        this.$refs.inputTitle.focus()
      })
    },
    // 失去焦点的时候和App组件通信，修改title  真正执行修改逻辑
    handleBlur(todo, e) {
      todo.isEdit = false
      if (!e.target.value.trim()) return alert('输入不能为空!')
      this.$bus.$emit('updateTodo', todo.id, e.target.value)
    }
  }
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #eee;
}

li:hover button {
  display: block;
}
.todo-enter-active{
  animation: todoItem 0.5s linear;
}
.todo-leave-active{
  animation: todoItem 0.5s linear;
}
@keyframes todoItem {
  from{
    transform: translateX(-100%);
  }
  to{
    transform: translateX(0px);
  }
}
</style>