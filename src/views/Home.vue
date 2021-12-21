<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <Product
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Product from "@/components/Product.vue"; // @ is an alias to /src

@Component({
  components: {
    Product,
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
