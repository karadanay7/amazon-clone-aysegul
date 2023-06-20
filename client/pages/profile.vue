<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2>Profile Page</h2>
          <a href="#" @click.prevent="onLogout">Logout</a>
          <form>
            <!-- Name -->
            <div class="a-spacing-top-medium">
              <label>Name</label>
              <input
                type="text"
                class="a-input-text"
                style="width: 100%"
                v-model="name"
                :placeholder="user?.name"
              />
            </div>
            <!-- Email -->
            <div class="a-spacing-top-medium">
              <label>Email</label>
              <input
                type="text"
                class="a-input-text"
                style="width: 100%"
                v-model="email"
                :placeholder="user?.email"
              />
            </div>
            <!-- password -->
            <div class="a-spacing-top-medium">
              <label>Password</label>
              <input
                type="text"
                class="a-input-text"
                style="width: 100%"
                v-model="password"
              />
            </div>
            <hr />
            <!-- Button -->
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onUpdateProfile"
                    >Update Profile</span
                  >
                </span>
              </span>
            </div>
          </form>
          <br />
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, toRefs } from "vue";
import { useAuthStore } from "../stores/auth"; // Update the path to your auth store file

const { user, token } = toRefs(useAuthStore());
const { updateUser, getUser, logout } = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");

const onUpdateProfile = async () => {
  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  try {
    const response = await fetch("http://localhost:3000/api/auth/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result, "result");
    if (result.success) {
      name.value = "";
      email.value = "";
      password.value = "";
      console.log("Profile updated successfully");
      console.log("Refreshing user information...");

      const userResponse = await getUser(); // Fetch the updated user information
      console.log(userResponse, "userResponse");
      updateUser(userResponse.user);
    }
  } catch (error) {
    console.log("Profile update failed:", error);
  }
};
const onLogout = () => {
  logout();
};
</script>

<style lang="scss" scoped></style>
