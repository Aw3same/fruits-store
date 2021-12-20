<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
  computed: {
    products: {
      get() {
        return this.$store.state.products;
      },
    },
  },
  mounted() {
    this.$store.dispatch("fetchProducts");
  },
})
export default class Home extends Vue {}
</script>
