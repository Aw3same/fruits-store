<template>
  <div class="container">
    <button class="btn-counter" @click="decreaseCounter()">-</button>
    <p class="amount">{{ iCounter }} kg</p>
    <button class="btn-counter" @click="increaseCounter()">+</button>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "counter",
})
export default class CounterComponent extends Vue {
  @Prop({default: 1}) private counter!: number;

  iCounter = this.counter; /** Used to avoid modifications in child from parent prop */

  @Watch('counter', {immediate: true}) onResetCounter(value: number): void {
  this.iCounter = value;
}

  increaseCounter(): void {
    this.iCounter += 1;
    this.$emit("changeAmount", this.iCounter);
  }

  decreaseCounter(): void {
    if (this.iCounter > 1) {
      this.iCounter -= 1;
      this.$emit("changeAmount", this.iCounter);
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
  cursor: pointer;

}
.amount {
  font-weight: bold;
  margin: 0 10px;
}
</style>