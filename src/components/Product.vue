<template>
  <div class="product-card">
    <h2>{{ product.name }}</h2>
    <p>{{ product.price }} € /kg</p>

    <Counter @changeAmount="changeAmount($event)" />

    <div class="btn-container">
      <button type="button" @click="addToCart(product, amount)" class="add">
        Add to Cart
      </button>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Product, CartProduct } from "@/store/types";
import Counter from "@/components/Counter.vue";

@Component({
  components: {
    Counter,
  },
})
export default class ProductComponent extends Vue {
  @Prop() private product!: Product;
  amount = 1;

  changeAmount(amount: number): void {
    this.amount = amount;
  }

  addToCart(product: Product, amount: number): void {
    const cartProduct: CartProduct = {
      product: product,
      amount: amount,
    };

    this.$store.dispatch("addProductToCart", cartProduct);
  }
}
</script>

<style scoped>
.product-card {
  width: 320px;
  padding: 0.5rem;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  border: 1px solid lightgrey;
  border-radius: 0.25rem;
}
.add {
  color: #fff;
  background-color: #1d3557;
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
}
.btn-container {
  margin: 0.5rem
}
</style>