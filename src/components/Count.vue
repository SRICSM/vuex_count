<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h3>当前求和放大十倍为：{{ bigSum }}</h3>
    <h3>我在{{ school }},学习{{ subject }}</h3>
    <h3 style="color:red">Person组件的总人数是：{{personList.length}}</h3>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions ,mapMutations} from "vuex";
export default {
  name: "Count",
  data() {
    return {
      n: 1, //用户选择的数字
    };
  },
  computed: {
    //靠程序员自己亲自去写计算属性
    // sum() {
    //   return this.$store.state.sum;
    // },
    // school() {
    //   return this.$store.state.school;
    // },
    // subject() {
    //   return this.$store.state.subject;
    // },

    //借助mapState生成计算属性，从state中读取数据  对象写法
    // 扩展运算符，将mapstate中的数据拆分成多个属性,放入计算属性中
    ...mapState('countAbout',{
      // 前面写入模块的名字 模块化写法
      sum: "sum",
      school: "school",
      subject: "subject",
    }),
    ...mapState('personAbout',{
      // 前面写入模块的名字 模块化写法
      personList: "personList",
    }),
    //借助mapState生成计算属性，从state中读取数据  数组写法 （state中的属性名和要配置的计算属性名一致，可以用数组写法）
    // ...mapState(['sum', 'school', 'subject']),

    //借助mapGetters生成计算属性，从getters中读取数据 数组写法
    ...mapGetters('countAbout',["bigSum"]),
    //借助mapGetters生成计算属性，从getters中读取数据  对象写法
    // ...mapGetters({bigSum: "bigSum"}),
  },
  methods: {
    // increment() {
    //   // 组件里面没有业务逻辑,直接提交给mutations处理
    //   this.$store.commit("JIA", this.n);
    // },
    // decrement() {
    //   // 组件里面没有业务逻辑,直接提交给mutations处理
    //   this.$store.commit("JIAN", this.n);
    // },

    //借助mapMutations生成方法，方法中会调用commit去联系mutations  对象写法
    // mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。
    ...mapMutations('countAbout',{
      // 前面写入模块的名字 模块化写法
      increment: "JIA",
      decrement: "JIAN",
    }),
    //借助mapMutations生成方法，提交(commit)给mutations处理  数组写法（方法名和mutations中的方法名一致，可以用数组写法）
    // ...mapMutations(["increment", "decrement"]),
    // ...mapMutations(["JIA", "JIAN"]),

    // incrementOdd() {
    //   // if (this.$store.state.sum % 2) {
    //   //   this.$store.dispatch('jiaOdd', this.n)
    //   // }
    //   this.$store.dispatch("jiaOdd", this.n);
    // },
    // incrementWait() {
    //   this.$store.dispatch("jiaWait", this.n);
    // },

    //借助mapActions生成方法，方法中会调用dispatch去联系actions  对象写法
    ...mapActions('countAbout',{
      incrementOdd: "jiaOdd",
      incrementWait: "jiaWait",
    }),
    //借助mapActions生成方法，方法中会调用dispatch去联系actions  数组写法（方法名和actions中的方法名一致，可以用数组写法）
    // ...mapActions(["incrementOdd", "incrementWait"]),
    // ...mapActions(["jiaOdd", "jiaWait"]),

  },
  mounted() {
    console.log('Count', this.$store)

    // mapState 将store里面的state(数据）映射到组件的data里面
    // const x = mapState({sum:'sum',school:'school',subject:'subject'});
    // console.log("Count", x);
  },
};
</script>

<style lang="css">
button {
  margin-left: 5px;
}
</style>
