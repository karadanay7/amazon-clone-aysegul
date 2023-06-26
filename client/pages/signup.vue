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
                <h1 class="a-spacing-small">Create account</h1>
                <!--Your Name -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label"
                    >Your name</label
                  >
                  <input
                    type="text"
                    id="ap_customer_name"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    v-model="name"
                  />
                </div>
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
                      <span class="a-button-text" @click="onSignup"
                        >Create your Amazon account</span
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
                    Already have an account?
                    <NuxtLink to="/login" class="a-link-emphasis"
                      >Sign in</NuxtLink
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

const name = ref("");
const email = ref("");
const password = ref("");
const onSignup = async () => {
  try {
    const response = await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    if (response.success) {
      router.push("/");
    } else {
      // Handle registration error
      console.error(response.message);
    }
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
</script>

<style lang="scss" scoped></style>
