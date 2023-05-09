<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2>Add a new owner</h2>
          <form>
            <!-- name -->
            <div class="a-spacing-top-medium">
              <label>Name</label>
              <input
                type="text"
                class="a-input-text"
                style="width: 100%"
                v-model="name"
              />
            </div>
            <!-- About -->
            <div class="a-spacing-top-medium">
              <label>About</label>
              <input
                type="text"
                class="a-input-text"
                style="width: 100%"
                v-model="about"
              />
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
            <hr />
            <!-- Button -->
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onAddOwner"
                    >Add owner</span
                  >
                </span>
              </span>
            </div>
          </form>
          <br />
          <ul class="list-group">
            <li
              v-for="owner in owners"
              :key="owner._id"
              class="list-group-item"
            >
              {{ owner.name }}
            </li>
          </ul>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script setup>
const ownersResponse = await useFetch("http://localhost:3000/api/owners");

const owners = ownersResponse.data.value.owners;

const name = ref("");
const about = ref("");
const selectedFile = ref(null);
const fileName = ref("");

// handle file selection
const onFileSelected = (event) => {
  let ASelectedFile = event.target.files[0];
  let nameOfFile = event.target.files[0].name;
  fileName.value = nameOfFile;
  selectedFile.value = ASelectedFile;
  console.log(selectedFile);
  console.log(fileName);
  return { selectedFile, fileName };
};
const onAddOwner = async () => {
  let formData = new FormData();
  formData.append("name", name.value);
  formData.append("about", about.value);
  formData.append("photo", selectedFile.value, fileName.value);

  await $fetch("http://localhost:3000/api/owners", {
    method: "POST",
    body: formData,
  });
  console.log(formData);
  console.log("Owner added successfully");
};
</script>

<style lang="scss" scoped></style>
