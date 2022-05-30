<template>
  <ul class="todo-main">
    <MyItem
        v-for="todoObj in todos"
        :key="todoObj.id"
        :todo="todoObj"
       />
  </ul>
</template>

<script>

import MyItem from "@/components/MyItem";

export default {
  name: "MyList",
  components: {MyItem},
  // 传过来的数据放入vc实例身上，可以直接在模板里面用（数据代理）
  props:['todos']
}
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}
</style>