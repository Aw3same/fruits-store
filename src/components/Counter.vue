<template>
  <div class="container">
    <button class="btn-counter" @click="decreaseCounter()">-</button>
    <p class="amount">{{ counter }}</p>
    <button class="btn-counter" @click="increaseCounter()">+</button>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "counter",
})
export default class CounterComponent extends Vue {
  counter = 1;

  increaseCounter(): void {
    this.counter += 1;
    this.$emit("changeAmount", this.counter);
  }

  decreaseCounter(): void {
    if (this.counter > 1) {
      this.counter -= 1;
      this.$emit("changeAmount", this.counter);
    }
  }
}
</script>

<style scoped>
.container {
  display: inline-flex;
  align-items: center;
}
.btn-counter {
  height: fit-content;
}
.amount {
    font-weight: bold;
    margin: 0 10px;
}
</style>