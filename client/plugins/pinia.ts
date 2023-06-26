import { useMainStore } from "~/store/cart";

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: useMainStore($pinia),
    },
  };
});
