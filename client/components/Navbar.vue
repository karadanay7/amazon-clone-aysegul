<template>
  <div>
    <header class="nav-opt-sprite nav-locate-us nav-lang-en nav-ssl nav-unrec">
      <div class="container-fluid dekstop-nav">
        <div class="row">
          <!--LOGO  -->
          <div class="col-sm-2">
            <div class="logo-area">
              <NuxtLink to="/">
                <img src="~/assets/img/logo.png" alt="logo" class="img-fluid" />
              </NuxtLink>
            </div>
          </div>
          <!-- Search Bar -->
          <div class="col-sm-6 pt-0">
            <Search />
          </div>
          <div class="col-sm-4"></div>
        </div>
        <div class="row">
          <!-- Delivery -->
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 pl-2">
            <div class="nav-global-location">
              <NuxtLink to="/address" class="nav-a nav-a-2">
                <div class="nav-sprite" id="nav-packard-glow-loc-icon"></div>
                <div id="glow-ingress-block">
                  <span class="nav-line-1" id="glow-ingress-line1"
                    >Deliver to
                  </span>
                  <span class="nav-line-2" id="glow-ingress-line2"
                    >{{ cityName }}
                  </span>
                </div>
              </NuxtLink>
            </div>
          </div>
          <!-- Shopping -->
          <div class="col-xl-6 col-lg-5 col-md-4 col-sm-6 pl-0">
            <div class="nav-fill">
              <div class="nav-shop">
                <NuxtLink
                  to="/history"
                  class="nav-a nav-a-2 nav-single-row-link"
                >
                  <span class="nav-line-2 ps-0 p-0">
                    Browsing History
                    <span
                      class="nav-icon nav-arrow"
                      style="visibility: visible"
                    ></span>
                  </span>
                </NuxtLink>
              </div>

              <div class="nav-xshop-container">
                <div class="nav-xshop">
                  <a href="#" class="nav-a">Today's deals</a>
                  <a href="#" class="nav-a">Your amazon.com</a>
                  <a href="#" class="nav-a">Gift cards</a>
                  <a href="#" class="nav-a">Registry</a>
                  <a href="#" class="nav-a">Sell</a>
                </div>
              </div>
            </div>
          </div>
          <!-- Accounts  & Order & Cart-->
          <div class="col-xl-4 col-lg-5 col-md-6 col-sm-4 pl-0">
            <div class="nav-tools">
              <a
                href="#"
                id="icp-nav-flyout"
                class="nav-a nav-a-2 icp-link-style-2"
              >
                <span class="icp-nav-link-inner">
                  <span class="nav-line-1">
                    <span class="icp-nav-globe-img-2"></span>
                    <span class="icp-nav-language mx-1">EN</span>
                  </span>
                  <span class="nav-line-2">
                    &nbsp;
                    <span
                      class="nav-icon nav-arrow"
                      style="visibility: visible"
                    ></span>
                  </span>
                </span>
              </a>
              <span class="icp-nav-link-border"></span>

              <template v-if="isLoggedIn">
                <NuxtLink
                  to="/profile"
                  class="nav-a nav-a-2"
                  id="nav-link-accountList"
                  tabindex="0"
                >
                  <span class="nav-line-1">Hello</span>
                  <span class="nav-line-2">
                    <span>{{ user.name }}</span>
                  </span>
                </NuxtLink>
              </template>
              <template v-else>
                <NuxtLink
                  to="/signup"
                  class="nav-a nav-a-2"
                  id="nav-link-accountList"
                  tabindex="0"
                >
                  <span class="nav-line-1">Hello, Sign in</span>
                  <span class="nav-line-2">
                    Account &amp; Lists
                    <span
                      class="nav-icon nav-arrow"
                      style="visibility: visible"
                    ></span>
                  </span> </NuxtLink
              ></template>

              <NuxtLink to="/orders" class="nav-a nav-a-2 nav-single-row-link">
                <span class="nav-line-1"></span>
                <span class="nav-line-2">Orders</span>
              </NuxtLink>
              <NuxtLink to="/cart" class="nav-a nav-a-2" id="nav-cart">
                <span aria-hidden="true" class="nav-line-1"></span>
                <span aria-hidden="true" class="nav-line-2">Cart</span>
                <span class="nav-cart-icon nav-sprite"></span>
                <span
                  id="nav-cart-count"
                  aria-hidden="true"
                  class="nav-cart-count nav-cart-0"
                  >{{ cartLength }}</span
                >
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import Search from "~/components/Search.vue";
import { useAuthStore } from "../store/auth"; //
import { useMainStore } from "../store/cart";
const { cartLength } = toRefs(useMainStore());

const { isLoggedIn, user } = useAuthStore();

const { token } = toRefs(useAuthStore());
const addresses = ref([]);
try {
  const response = await fetch("http://localhost:3000/api/addresses", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  addresses.value = data.addresses;
  // Perform any further actions with the addresses data
} catch (error) {
  console.log(error);
  // Handle any network or other errors
}
const cityName = computed(() => addresses.value?.[0].city);
</script>

<style lang="scss" scoped></style>
