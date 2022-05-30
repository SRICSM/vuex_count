<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!--用props方法把函数传给子组件，然后在子组件调用函数传参数-->
        <!--<MyHeader :addtodo="addtodo"/>-->

        <!--给组件绑定自定义事件，利用vue.$emit定义事件传参-->
        <MyHeader @addtodo="addtodo"/>
        <MyList :todos="todos"/>

        <!--用props方法把函数传给子组件，然后在子组件调用函数传参数-->
        <!-- <MyFooter :todos="todos" :checkAllTodo="checkAllTodo" :cleanAllTodo="cleanAllTodo"/>-->
        <!--给组件绑定自定义事件，利用vue.$emit定义事件传参-->
        <MyFooter :todos="todos" @checkAllTodo="checkAllTodo" @cleanAllTodo="cleanAllTodo"/>
      </div>
    </div>
  </div>
</template>

<script>

import pubsub from 'pubsub-js'
import MyHeader from "@/components/MyHeader";
import MyFooter from "@/components/MyFooter";
import MyList from "@/components/MyList";

export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter,
    MyList
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos')) || []
    }
  },
  watch: {
    // todos(value){
    //   localStorage.setItem('todos',JSON.stringify(value))
    // }
    todos: {
      // 深度监视，可以监视todos数组里面的数据的变化
      deep: true,
      handler(value) {
        localStorage.setItem('todos', JSON.stringify(value))
      }
    }
  },
  methods: {
    // 父组件传给子组件一个函数   添加一个todo
    addtodo(todoObj) {
      this.todos.unshift(todoObj)
    },
    // 勾选或者取消勾选一个todo
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done
      })
    },
    // 更新一个Todo
    updateTodo(id,title) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.title = title
      })
    },
    // 删除一个todo 可以用数组过滤的方式   返回的id是要删除的id 过滤出不是返回的id的数据
    // filter不改变原数组，要对原数组重新赋值     (消息订阅与发布至少有两个参数，消息名和接收过来的数据)
    deleteTodo(_, id) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id
      })
    },
    // 全选或者取消全选
    checkAllTodo(done) {
      this.todos.forEach((todo) => {
        todo.done = done
      })
    },
    // 清除所有已经完成的todo
    cleanAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done
      })
    }
  },
  mounted() {
    // 绑定全局事件总线  前一个参数：事件名   后一个参数：事件触发的回调函数
    this.$bus.$on('checkTodo', this.checkTodo)
    // this.$bus.$on('deleteTodo',this.deleteTodo)

    // 绑定updateTodo
    this.$bus.$on('updateTodo',this.updateTodo)

    // 要获取数据的人订阅消息  消息名
    this.pubId = pubsub.subscribe('deleteTodo', this.deleteTodo)
  },
  beforeDestroy() {
    // 解绑事件
    this.$bus.$off('checkTodo', this.checkTodo)
    this.$bus.$off('updateTodo',this.updateTodo)
    pubsub.unsubscribe(this.pubId)
  }
}
</script>

<style>
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: #cccc88;
  border: 1px solid pink;
  margin-right: 5px;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}

</style>