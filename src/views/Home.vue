<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <ProductComponent
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <div class="mt-10">
    <router-link to="/cart" v-if="checkIfCartHasProducts()" custom v-slot="{ navigate }">
      <button @click="navigate" role="link" class="checkout"
        ><i class="fas fa-shopping-basket checkout-icon"></i>Go to Checkout</button>
    </router-link>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProductComponent from "@/components/Product.vue"; // @ is an alias to /src
import { Product } from "@/store/types";

@Component({
  components: {
    ProductComponent,
  },
})
export default class Home extends Vue {
  products: Product[];

  created(): void {
    this.$store.dispatch("fetchProducts");
    this.products = this.$store.state.products;
  }

  checkIfCartHasProducts(): boolean {
    return this.$store.state.StoreCart.length > 0;
  }
}
</script>

<style scoped>
.checkout {
  width: 75%;
  color: #fff;
  background-color: #0c1624;
  border-color: #1d3557;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  cursor: pointer;
}
.mt-10 {
  margin-top: 10px;;
}
.checkout-icon {
  margin-right: 10px;
  font-size: 20px;
}
</style>