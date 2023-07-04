<template>
  <!--MAIN-->
  <main>
    <!--Payment -->
    <div class="registerAddress mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <div class="a-section a-spacing-medium">
              <!-- Breadcrumbs -->
              <div class="a-subheader a-breadcrumb a-spacing-small">
                <ul>
                  <li>
                    <nuxt-link to="/cart">
                      <span>Your Cart</span>
                    </nuxt-link>
                  </li>
                  <li class="a-breadcrumb-divider">›</li>
                  <li>
                    <nuxt-link to="/placeorder">
                      <span>Place order</span>
                    </nuxt-link>
                  </li>
                  <li class="a-breadcrumb-divider">›</li>
                  <li class="active">
                    <nuxt-link to="/payment">
                      <span>Payment</span>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="a-section">
              <h2>Make a payment</h2>
              <div class="a-section a-spacing-none a-spacing-top-small">
                <b>The total price is ${{ getCartTotalPriceWithShipping }}</b>
              </div>

              <!-- Error message  -->
              <div class="a-section a-spacing-none a-spacing-top-small">
                <b>Error</b>
              </div>
              <form action="#" method="post">
                <div class="a-spacing-medium a-spacing-top-medium">
                  <div class="a-spacing-top-medium">
                    <!-- Stripe card -->
                    <div id="card-element" ref="card"></div>
                    <!-- End of Stripe card -->
                  </div>

                  <div class="a-spacing-top-medium"></div>
                  <hr />
                  <div class="a-spacing-top-medium">
                    <span>
                      <b>Make sure your address is correct</b>
                    </span>
                  </div>
                  <div>
                    <span
                      >If the address contains typos or other errors, your
                      package may be undeliverable.</span
                    >
                  </div>

                  <!-- Purchase Button -->
                  <div class="a-spacing-top-large">
                    <span class="a-button-register">
                      <span class="a-button-inner">
                        <span @click="onPurchase" class="a-button-text"
                          >Purchase</span
                        >
                      </span>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-sm-3"></div>
        </div>
      </div>
    </div>
    <!--/Payment ADDRESS-->
  </main>
  <!--/MAIN-->
</template>
<script setup>
import { useAuthStore } from "../store/auth";
import { useMainStore } from "../store/cart";
const { cart, getCartTotalPriceWithShipping, shippingEstimatedDelivery } =
  toRefs(useMainStore());
const { setShipment } = useMainStore();

const { token } = toRefs(useAuthStore());

const { clearCart } = useMainStore();
const router = useRouter();
const stripe = ref(null);
const card = ref(null);
const error = ref("");

onMounted(() => {
  stripe.value = Stripe(
    "pk_test_51NNMDLB4coRtVjaI1mdV7TJCReHoNtEHi9v6f3UUSZ0sYxxabjDX5aiYRcUT8fdPsRm8A4iTwDbzCGaIsZpqyQ3j00gwTWXn8R"
  );
  let elements = stripe.value.elements();
  card.value = elements.create("card");

  card.value.mount("#card-element");
});

const onPurchase = async () => {
  try {
    let stripeToken = await stripe.value.createToken(card.value);
    let response = await fetch("http://localhost:3000/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },

      body: JSON.stringify({
        token: stripeToken.id, // Use `token.id` instead of `token`
        totalPrice: getCartTotalPriceWithShipping.value,
        cart: cart.value,
        estimatedDelivery: shippingEstimatedDelivery.value,
      }),
    });

    if (response.ok) {
      clearCart();
      // Payment successful
      router.push("/");
    } else {
      // Payment failed
      throw new Error("Payment failed: " + response.statusText);
    }
  } catch (err) {
    console.error(err);
    error.value = "Payment failed. Please try again.";
  }
};
</script>

<style>
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
