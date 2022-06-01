<template>
  <div>
    <h1>人员列表</h1>
    <h3 style="color: skyblue">Count组件的求和为：{{ sum }}</h3>
    <input type="text" placeholder="请输入名字" v-model="name" />
    <button @click="add">添加</button>
    <button @click="addWang">添加一个姓王的人</button>
    <button @click="addPersonServer">添加一个人，名字随机</button>
    <ul>
      <li v-for="p in personList" :key="p.id">{{ p.name }}</li>
    </ul>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Person",
  data() {
    return {
      name: "",
    };
  },
  computed: {
    personList() {
      return this.$store.state.personAbout.personList;
    },
    sum() {
      return this.$store.state.countAbout.sum;
    },
    // ...mapState(['personList'])
  },
  methods: {
    add() {
      const personObj = {
        id: nanoid(),
        name: this.name,
      };
      this.$store.commit("personAbout/ADD_PERSON", personObj);
      // 清空当前输入
      this.name = "";
    },
    addWang() {
      const personObj = {
        id: nanoid(),
        name: this.name,
      }
      //有限定条件的添加，只有姓王的人才能添加，先交给dispatch，然后在mutations中处理
      this.$store.dispatch("personAbout/addPersonWang", personObj);
      this.name = "";
    },
    addPersonServer() {
    //在actions中处理 发送axios请求获取数据,然后在mutations中处理
      this.$store.dispatch("personAbout/addPersonServer");
    },
  },
}
</script>

<style scoped>
</style>