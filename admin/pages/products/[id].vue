<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <h2 style="text-align: center">Update {{ product.title }}</h2>
            <form>
              <!-- Category Dropdown -->
              <div class="a-spacing-top-medium">
                <label>Category</label>
                <select class="a-select-option" v-model="categoryID">
                  <option
                    v-for="category in categories"
                    :value="category._id"
                    :key="category._id"
                  >
                    {{ category.type }}
                  </option>
                </select>
              </div>
              <!-- Owner Dropdown -->
              <div class="a-spacing-top-medium">
                <label>Owner</label>
                <select class="a-select-option" v-model="ownerID">
                  <option
                    v-for="owner in owners"
                    :value="owner._id"
                    :key="owner._id"
                  >
                    {{ owner.name }}
                  </option>
                </select>
              </div>
              <!-- Title Input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Title </label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="title"
                  :placeholder="product.title"
                />
              </div>
              <!-- Price Input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Price </label>
                <input
                  type="number"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="price"
                  :placeholder="product.price"
                />
              </div>
              <!-- Stockquantity Input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Stock Quantity </label>
                <input
                  type="number"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="stockQuantity"
                  :placeholder="product.stockQuantity"
                />
              </div>
              <!-- Description textarea -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Description </label>
                <textarea
                  style="width: 100%"
                  v-model="description"
                  :placeholder="product.description"
                ></textarea>
              </div>
              <!-- Photo File -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Add Photo </label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input type="file" @change="onFileSelected" />
                    <p style="margin-top: -70px">{{ fileName }}</p>
                  </label>
                </div>
              </div>
              <!-- Button -->
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onUpdateProduct"
                      >Update product</span
                    >
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();

const productResponse = await useFetch(
  `http://localhost:3000/api/products/${route.params.id}`
);

const product = productResponse.data.value.product;
const categoriesResponse = await useFetch(
  "http://localhost:3000/api/categories"
);

const categories = categoriesResponse.data.value.categories;
const ownersResponse = await useFetch("http://localhost:3000/api/owners");

const owners = ownersResponse.data.value.owners;

const categoryID = ref(null);
const ownerID = ref(null);
const title = ref("");
const price = ref("");
const stockQuantity = ref("");
const description = ref("");
const selectedFile = ref(null);
const fileName = ref("");

const onFileSelected = (event) => {
  let ASelectedFile = event.target.files[0];
  let nameOfFile = event.target.files[0].name;
  fileName.value = nameOfFile;
  selectedFile.value = ASelectedFile;

  return { selectedFile, fileName };
};
const onUpdateProduct = async () => {
  let formData = new FormData();
  formData.append("categoryID", categoryID.value);
  formData.append("ownerID", ownerID.value);
  formData.append("title", title.value);
  formData.append("price", price.value);
  formData.append("stockQuantity", stockQuantity.value);
  formData.append("description", description.value);
  formData.append("photo", selectedFile.value, fileName.value);

  await $fetch(`http://localhost:3000/api/products/${route.params.id}`, {
    method: "PUT",
    body: formData,
  });
  console.log("categoryID", categoryID.value);

  console.log("Product updated successfully");
};
</script>
