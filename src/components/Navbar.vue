<template>
  <ul class="menu">
    <li class="menu-item" v-for="link in links" :key="link.id">
      <router-link v-bind:to="link.url" class="menu-link">
        <i class="menu-icon" :class="link.icon"></i>
        <span>{{ link.text }}</span>
        <span v-if="link.text === 'Cart'"> ({{ productsInCart }})</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0,
      links: [
        {
          id: 1,
          text: "Products",
          icon: "fas fa-store",
          url: "/",
        },
        {
          id: 2,
          text: "About",
          icon: "fas fa-question-circle",
          url: "/about",
        },
        {
          id: 3,
          text: "Cart",
          icon: "fas fa-shopping-basket",
          url: "/cart",
        },
      ],
    };
  },
  computed: {
    productsInCart: {
      get() {
        return this.$store.state.StoreCart.length;
      },
    },
  },
};
</script>

<style>
:root {
  --link-text-color: #f1faee;
  --menu-background-color: #1d3557;
  --active-background-color: #f3f04d;
}
/* ul */
.menu {
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  background-color: var(--menu-background-color);
  display: inline-flex;
  border-radius: 4px;
  list-style-type: none;
  overflow: hidden;
}
/* li */
.title {
  color: white;
  padding: 0.75rem 1rem;
}
.menu-item {
  display: inline-flex;
}

/* a */
.menu-link {
  padding: 0.75rem 1rem;
  display: inline-flex;
  align-items: center;
  color: var(--link-text-color);
  text-decoration: none;
}

.menu-link:hover,
.menu-link.active {
  color: var(--active-color);
  background-color: var(--active-background-color);
}

.right {
  right: 0;
  padding: 0.75rem 1rem;
  position: absolute;
}

/* icon */
.menu-icon {
  height: 1.5rem;
  width: 1.5rem;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  margin-right: 0.2rem;
}
/* slider */
.menu-indicator {
  position: absolute;
  height: 0.25rem;
  background-color: var(--active-color);
  bottom: 0;
  left: 0;
  margin: auto;
  width: 3rem;
  transition: all ease 0.5s;
}
</style>