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
        <div v-if="voucherNotValid">
          <p>The code introduced is not valid</p>
        </div>
        <div v-if="voucherCodeValid">
          <p>Valid code! Applied {{ voucher.discount }} % in {{ voucher.products.length > 0 ? voucher.products : 'all products!' }} </p>
        </div>
        <button
          type="button"
          @click="applyVoucher(voucherCode)"
          class="apply-voucher"
        >
          Apply
        </button>
      </div>
    </div>
    <div class="total-price">
      <h3>TOTAL {{ finalPrice }} €</h3>
      <div>
        <button type="button" class="apply-voucher" @click="checkout()">
          <i class="fas fa-shopping-bag"></i>
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CartProduct, Voucher } from "@/store/types";
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
  voucherNotValid = false;
  voucherCodeValid = false;
  voucher: Voucher;
  finalPrice = 0;

  created(): void {
    this.$store.dispatch("fetchVouchers");
    this.cartItems = this.$store.state.StoreCart;
    const sum = this.cartItems?.reduce(
      (sum, current) => sum + current.amount * current.product.price,
      0
    );
    this.totalPrice = Math.round(sum * 100) / 100;
    this.finalPrice = this.totalPrice;
  }

  applyVoucher(code: string): void {
    this.voucherNotValid = false;
    this.voucherCodeValid = false;
    const voucher = this.$store.state.vouchers.find(
      (voucher: Voucher) => voucher.code === code.toLowerCase()
    );
    this.voucher = voucher;
    let total = 0;
    /** Case 1: Voucher that affects N products */
    if (voucher && voucher.products.length > 0) {
      this.voucherCodeValid = true;
      const discount = 1 - voucher.discount / 100;
      total = this.cartItems?.reduce((sum, current) => {
        if (voucher.products.includes(current.product.name)) {
          return sum + current.amount * (current.product.price * discount);
        }
        return sum + current.amount * current.product.price;
      }, 0);
    } else if (voucher) {
      /** Case 2: Voucher that affects all products */
      this.voucherCodeValid = true;
      const discount = 1 - voucher.discount / 100;
      total = this.cartItems?.reduce((sum, current) => {
        return sum + current.amount * (current.product.price * discount);
      }, 0);
    } else {
      /** Case 3: voucher not valid */
      this.voucherNotValid = true;
      total = this.cartItems?.reduce((sum, current) => {
        return sum + current.amount * current.product.price;
      }, 0);
    }
    this.finalPrice = Math.round(total * 100) / 100;
  }

  checkout(): void {
    const numOrder = Math.floor(Math.random() * (1000 + 1));
    /** Here we can change this with an API call to create an order */
    alert(`Order Nº #${numOrder} succesfully created! Enjoy your fruits!`);
    this.$store.dispatch("emptyCart");
    this.cartItems = [];
    this.totalPrice = 0;
    this.finalPrice = 0;
    this.voucherCode = "";
    this.voucherCodeCheckbox = false;
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
input {
  font-weight: 400;
  vertical-align: middle;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}

.apply-voucher {
  margin-left: 5px;
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
.voucher {
  margin-top: 10px;
  display: block;
}
</style>