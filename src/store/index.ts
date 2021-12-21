import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { Product, CartProduct, RootState } from "./types";
import products from "@/assets/products.json";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    products: [],
    StoreCart: [],
  },
  getters: {
    products: (state) => state.products,
    StoreCart: (state) => state.StoreCart,
  },
  mutations: {
    SET_Products(state, products: Product[]) {
      state.products = products;
    },
    ADD_Product(state, product: CartProduct) {
      state.StoreCart.push(product);
    },
    REMOVE_Product(state, index) {
      state.StoreCart.splice(index, 1);
    },
  },
  actions: {
    fetchProducts({ commit }) {
      /** In case we have an API, replace this with an API call with fecth/axios
       * Example:
       * fetch("<API_URL>").then(r =>  Do stuff here);*/
      commit("SET_Products", products);
    },
    addProductToCart({ commit }, id) {
      commit("ADD_Product", id);
    },

    removeItem({ commit }, index) {
      commit("REMOVE_Product", index);
    },
  },
  modules: {},
};

export default new Vuex.Store<RootState>(store);
