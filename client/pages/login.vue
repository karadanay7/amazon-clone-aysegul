<template>
  <div class="registerPage">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <div class="text-center">
            <NuxtLink to="/">
              <img src="../assets/img/logo-black.png"
            /></NuxtLink>
          </div>
          <form class="mt-4">
            <div class="a-box a-spacing-extra-large">
              <div class="a-box-inner">
                <h1 class="a-spacing-small">Sign in</h1>

                <!--Your Email -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label"
                    >Email</label
                  >
                  <input
                    type="email"
                    id="ap_customer_email"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    v-model="email"
                  />
                </div>
                <!--Password -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label"
                    >Password</label
                  >
                  <input
                    type="password"
                    id="ap_customer_password"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    v-model="password"
                  />
                  <div class="a-alert-container">
                    <div class="a-alert-content">
                      Password must be at least 6 characters
                    </div>
                  </div>
                </div>
                <!-- Button -->
                <div class="a-row a-spacing-extra-large mb-4">
                  <span class="a-button-primary">
                    <span class="a-button-inner">
                      <span class="a-button-text" @click="onLogin"
                        >Continue</span
                      >
                    </span>
                  </span>
                  <div class="a-row a-spacing-top-medium a-size-small">
                    <b>
                      By creating an account, you agree to Amazon's
                      <a href="#">Conditions of Use</a> and
                      <a href="#">Privacy Notice </a>
                    </b>
                  </div>
                </div>
                <hr />
                <div class="a-row">
                  <b>
                    Don't have an account?
                    <NuxtLink to="/signup" class="a-link-emphasis"
                      >Signup</NuxtLink
                    >
                  </b>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "none",
});
const router = useRouter();

import { useAuthStore } from "~/store/auth";
const auth = useAuthStore();

const email = ref("");
const password = ref("");

const onLogin = async () => {
  try {
    const response = await auth.login({
      email: email.value,
      password: password.value,
    });
    if (response.success) {
      router.push("/");
    } else {
      // Handle login error
      console.error(response.message);
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>
<style lang="scss" scoped></style>
