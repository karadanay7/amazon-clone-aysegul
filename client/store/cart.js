import { defineStore } from "pinia";

export const useMainStore = defineStore(
  "main",
  () => {
    const cart = ref([]);
    const cartLength = computed(() =>
      cart.value?.reduce((acc, product) => acc + product.quantity, 0)
    );

    const pushProductToCart = (product) => {
      product.quantity = 1;
      cart.value.push(product);
    };
    const removeProductFromCart = (product) => {
      let indexOfProduct = cart.value.indexOf(product);
      cart.value.splice(indexOfProduct, 1, product);
    };

    const incrementProductQty = (product) => {
      const cartProduct = cart.value.find((prod) => prod._id === product._id);
      cartProduct.quantity++;
    };

    const addProductToCart = (product) => {
      const cartProduct = cart.value.find((prod) => prod._id === product._id);
      if (!cartProduct) {
        pushProductToCart(product);
      } else {
        incrementProductQty(cartProduct);
      }
    };
    const getCartTotalPrice = computed(() => {
      let total = 0;
      cart.value.forEach((product) => {
        total += product.price * product.quantity;
      });
      return total;
    });
    const removeProduct = (product) => {
      cart.value = [];
    };

    return {
      cart,
      cartLength,
      addProductToCart,
      removeProductFromCart,
      getCartTotalPrice,
      removeProduct,
    };
  },
  {
    persist: {
      key: "main",
      storage: persistedState.localStorage,
    },
  }
);
