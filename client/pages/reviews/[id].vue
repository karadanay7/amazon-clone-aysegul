<template>
  <!--MAIN-->
  <main>
    <!--REVIEW ADDRESS-->
    <div class="reviewPage mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
            <div class="a-spacing-top-medium">
              <h1 class="a-spacing-base">
                <b>Create Review</b>
              </h1>
              <div class="row">
                <!-- Product Photo -->
                <div class="col-md-2 col-sm-3 col-3">
                  <img :src="product.photo" style="width: 80px" />
                </div>
                <!-- Product Title -->
                <div class="col-md-10 col-sm-9 col-9 m-auto">
                  <h4>
                    <b>{{ product.title }}</b>
                  </h4>
                </div>
              </div>
              <div class="a-spacing-top-medium"></div>
              <hr />
              <h2 class="a-spacing-base">Overall Rating</h2>
              <div class="a-row">
                <!-- Rating -->
                <ClientOnly>
                  <VueStarRating v-model:rating="rating"> </VueStarRating>
                </ClientOnly>
              </div>
              <div class="a-row a-spacing-top-large">
                <h2>Add photo or video</h2>
                <p style="font-size: 14px; font-weight: 700">
                  Shoppers find images and videos more helpful than text alone.
                </p>
              </div>
              <div class="a-row a-spacing-top-medium">
                <!-- Choose a Photo -->
                <label class="choosefile-button">
                  <i class="fal fa-plus"></i>

                  <input type="file" @change="onFileSelected" />
                </label>
                <p>{{ fileName }}</p>
              </div>
              <div class="a-spacing-top-large"></div>
              <hr />
              <!-- Headline -->
              <div class="headline a-spacing-large">
                <h2 class="a-spacing-base">Add a headline</h2>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 70%"
                  placeholder="What's most important to know?"
                  v-model="headline"
                />
              </div>
              <!-- Body -->
              <div class="a-spacing-base">
                <h2 class="a-spacing-base">Write your review</h2>
                <textarea
                  placeholder="What do you like or dislike? What did you see this product for?"
                  style="height: 6em; width: 100%"
                ></textarea>
              </div>
            </div>
            <br />
            <br />
            <hr />
            <div class="a-spacing-top-medium">
              <p style="font-size: 14px; font-weight: 700">
                This is how you'll appear to other customers:
              </p>
              <div class="media a-spacing-top-large">
                <div class="media-left">
                  <img
                    src="/img/avatar.png"
                    class="img-fluid"
                    style="width: 50px"
                  />
                </div>
                <div class="media-body pl-3 pt-2">
                  <input
                    type="text"
                    class="a-input-text"
                    style="width: 100%"
                    :value="user.name"
                  />
                </div>
              </div>
            </div>
            <div class="a-row a-spacing-top-medium">
              <span class="a-color-tertiary"
                >Don't worry, you can always change this on your profile</span
              >
            </div>
            <div class="a-row text-right a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="submitReview"
                    >Submit</span
                  >
                </span>
              </span>
            </div>
          </div>
          <div class="col-sm-2"></div>
        </div>
        <div class="a-spacing-large pb-5"></div>
        <hr />
      </div>
    </div>
    <!--/REVIEW ADDRESS-->
  </main>
  <!--/MAIN-->
</template>
<script setup>
import { ref } from "vue";
import VueStarRating from "vue-star-rating";
import { useAuthStore } from "../../store/auth"; // Update the path to your auth store file
const route = useRoute();
const router = useRouter();

const { user } = useAuthStore();

const productResponse = await useFetch(
  `http://localhost:3000/api/products/${route.params.id}`
);
const product = productResponse.data.value.product;

const rating = ref(0);
const body = ref("");
const headline = ref("");
const selectedFile = ref(null);
const fileName = ref("");

const onFileSelected = (event) => {
  let ASelectedFile = event.target.files[0];
  let nameOfFile = event.target.files[0].name;
  fileName.value = nameOfFile;
  selectedFile.value = ASelectedFile;

  return { selectedFile, fileName };
};

const submitReview = async () => {
  let formData = new FormData();
  formData.append("rating", rating.value);
  formData.append("photo", selectedFile.value, fileName.value);
  formData.append("headline", headline.value);
  formData.append("body", body.value);

  await $fetch(`http://localhost:3000/api/reviews/${route.params.id}`, {
    method: "POST",
    body: formData,
  });
  router.push(`/products/${route.params.id}`);
  //   router.push(`/products/${route.params.id}`);
};
</script>
<style scoped></style>
