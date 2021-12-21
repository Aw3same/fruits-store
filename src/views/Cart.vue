<template>
  <div class="about">
    <h1>Your Cart</h1>
    <div class="cart">
      <table id="firstTable">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price (€/kg)</th>
            <th>Amount (kg)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in cartItems" :key="index">
            <td>{{ row.product.name }}</td>
            <td>{{ row.product.price }}</td>
            <td>{{ row.amount }}</td>
            <td>{{ row.product.price * row.amount }}</td>
          </tr>
          <tr class="lastRow">
            <td colspan="3">TOTAL</td>
            <td>{{ totalPrice }} €</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="voucher">
      <input type="checkbox" id="checkbox" v-model="voucherCodeCheckbox" />
      <label for="checkbox">I have a voucher code</label>
      <div v-if="voucherCodeCheckbox">
        <input v-model="voucherCode" placeholder="Code.." />
        <button type="button" @click="applyVoucher(voucherCode)" class="add">
          Apply
        </button>
      </div>
    </div>
    <div class="total-price">
      <h3>TOTAL {{ finalPrice }} €</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CartProduct } from "@/store/types";
import Counter from "@/components/Counter.vue";

@Component({
  components: {
    Counter,
  },
})
export default class CartComponent extends Vue {
  cartItems: CartProduct[];
  totalPrice = 0;
  voucherCodeCheckbox = false;
  voucherCode = "";
  finalPrice = 0;

  created(): void {
    this.cartItems = this.$store.state.StoreCart;
    const sum = this.cartItems?.reduce(
      (sum, current) => sum + current.amount * current.product.price,
      0
    );
    this.totalPrice = Math.round(sum * 100) / 100;
    this.finalPrice = this.totalPrice;
  }

  applyVoucher(code: string): void {
    let sum = this.cartItems?.reduce((sum, current) => {
      return sum + current.amount * current.product.price;
    }, 0);
    switch (code) {
      case "HAPPYBIRTHDAY":
        sum = sum * 0.8;
        break;
      case "KATOO":
        sum = sum * 0.5;
        break;
      case "ILIKEAPPLES":
        console.log("entro aqui ILIKEAPPLES");
        sum = this.cartItems?.reduce((sum, current) => {
          if (current.product.name === "Apples") {
            return sum + current.amount * (current.product.price * 0.4);
          } else {
            return sum + current.amount * current.product.price;
          }
        }, 0);
        break;
    }
    this.finalPrice = Math.round(sum * 100) / 100;
  }
}
</script>

<style scoped>
.cart {
  display: inline-flex;
}
table {
  /* font-family: 'Open Sans', sans-serif; */
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f9;
}
.lastRow {
  border-block: 2px solid #44475c;
  font-weight: bold;
}

.apply-voucher {
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
  cursor: pointer;
}
</style>