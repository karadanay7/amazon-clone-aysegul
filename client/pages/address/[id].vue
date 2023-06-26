<template>
  <!--MAIN-->
  <main>
    <!--REGISTER ADDRESS-->
    <div class="registerAddress mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <div class="a-section a-spacing-medium">
              <div class="a-subheader a-breadcrumb a-spacing-small">
                <ul>
                  <li>
                    <a href="#">
                      <span>Your Account</span>
                    </a>
                  </li>
                  <li class="a-breadcrumb-divider">›</li>
                  <li>
                    <a href="#">
                      <span>Your Adresses</span>
                    </a>
                  </li>
                  <li class="a-breadcrumb-divider">›</li>
                  <li class="active">
                    <a href="#">
                      <span>New Address</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="a-section">
              <h2>Update Address</h2>
              <div class="a-section a-spacing-none a-spacing-top-small">
                <b>
                  Or pick up your packages at your convenience from our
                  self-service locations. To add an Amazon Pickup Point or
                  Locker, click
                  <a href="#">here</a>.
                </b>
              </div>
              <!-- Error Message -->
              <div class="a-section a-spacing-none a-spacing-top-small">
                <b></b>
              </div>
              <form>
                <div class="a-spacing-medium a-spacing-top-medium">
                  <!-- Country / Region -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px">Country/Region</label>
                    <select class="a-select-option" v-model="country">
                      <option
                        v-for="country in countries"
                        :key="country.iso2"
                        :value="country"
                      >
                        {{ country }}
                      </option>
                      <option></option>
                    </select>
                  </div>
                  <!-- Full name -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px">Full Name</label>
                    <input
                      type="text"
                      class="a-input-text"
                      style="width: 100%"
                      v-model="fullName"
                      :placeholder="address.fullName"
                    />
                  </div>
                  <!-- Street Address -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px">Street Address</label>
                    <input
                      type="text"
                      class="a-input-text"
                      style="width: 100%"
                      v-model="streetAddress1"
                      :placeholder="address.streetAddress"
                    />
                    <!-- Street Address 2 -->
                    <input
                      type="text"
                      class="a-input-text a-spacing-top-small"
                      style="width: 100%"
                      v-model="streetAddress2"
                    />
                  </div>
                  <!-- City -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px">City</label>
                    <input
                      type="text"
                      class="a-input-text"
                      style="width: 100%"
                      v-model="city"
                      :placeholder="address.city"
                    />
                  </div>
                  <!-- State -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px"
                      >State / Province / Region</label
                    >
                    <input
                      type="text"
                      class="a-input-text"
                      style="width: 100%"
                      v-model="state"
                      :placeholder="address.state"
                    />
                  </div>
                  <!-- Zip Code -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px">Zip Code</label>
                    <input
                      type="text"
                      class="a-input-text"
                      style="width: 100%"
                      v-model="zipCode"
                      :placeholder="address.zipCode"
                    />
                  </div>
                  <!-- Phone Number -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px">Phone Number</label>
                    <input
                      type="text"
                      class="a-input-text"
                      style="width: 100%"
                      v-model="phoneNumber"
                      :placeholder="address.phoneNumber"
                    />
                    <div class="a-section a-spacing-none a-spacing-top-micro">
                      <span class="a-size-mini"
                        >May be used to assist delivery</span
                      >
                    </div>
                  </div>
                  <div class="a-spacing-base a-spacing-top-medium">
                    <h3>Add delivery instructions</h3>
                  </div>
                  <!-- Delivery Instruction -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px"
                      >Do we need additional instructions to find this
                      address?</label
                    >
                    <textarea
                      style="height: 6em; width: 100%"
                      v-model="deliveryInstructions"
                      :placeholder="address.deliveryInstructions"
                    ></textarea>
                  </div>
                  <!-- Security code -->
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px"
                      >Do we need a security code or a call box number to access
                      this building?</label
                    >
                    <input
                      type="text"
                      class="a-input-text"
                      style="width: 100%"
                      v-model="securityCode"
                      :placeholder="address.securityCode"
                    />
                  </div>
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px">Weekend delivery</label>
                    <a href="#">
                      <i class="fas fa-angle-down"></i> Which days can you
                      receive packages?
                    </a>
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
                  <div class="a-spacing-top-small">
                    <span>
                      <a href="#">Tips for entering addresses</a>
                    </span>
                    <span>|</span>
                    <span>
                      <a href="#">APO/FPO address tips</a>
                    </span>
                  </div>
                  <div class="a-spacing-top-large">
                    <span class="a-button-register">
                      <span class="a-button-inner">
                        <span class="a-button-text" @click="onUpdateAddress"
                          >Update address</span
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
    <!--/REGISTER ADDRESS-->
  </main>
  <!--/MAIN-->
</template>
<script setup>
import { useAuthStore } from "~/store/auth";
const route = useRoute();
const address = ref([]);
const { token } = toRefs(useAuthStore());
try {
  const addressResponse = await fetch(
    `http://localhost:3000/api/addresses/${route.params.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await addressResponse.json();
  address.value = data.address;
  // Perform any further actions with the addresses data
} catch (error) {
  console.log(error);
  // Handle any network or other errors
}

const response = await useFetch(`http://localhost:3000/api/countries`);

const countriesArray = response?.data.value?.data;
// from response country key is for country name
const countries = countriesArray?.map((country) => country.country);

const router = useRouter();
const country = ref("United States");
const fullName = ref("");
const streetAddress1 = ref("");
const streetAddress2 = ref("");
const city = ref("");
const state = ref("");
const zipCode = ref("");
const phoneNumber = ref("");
const deliveryInstructions = ref("");
const securityCode = ref("");

const onUpdateAddress = async () => {
  const data = {
    country: country.value,
    fullName: fullName.value,
    streetAddress: streetAddress1.value + " " + streetAddress2.value,
    city: city.value,
    state: state.value,
    zipCode: zipCode.value,
    phoneNumber: phoneNumber.value,
    deliveryInstructions: deliveryInstructions.value,
    securityCode: securityCode.value,
  };
  await fetch(`http://localhost:3000/api/addresses/${route.params.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  router.push("/");
};
</script>
