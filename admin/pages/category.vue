<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2>Add a new category</h2>
          <form>
            <div class="a-spacing-top-medium">
              <label>Type</label>
              <input
                type="text"
                class="a-input-text"
                style="width: 100%"
                v-model="type"
              />
            </div>
            <hr />
            <!-- Button -->
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onAddCategory"
                    >Add category</span
                  >
                </span>
              </span>
            </div>
          </form>
          <br />
          <ul class="list-group">
            <li
              v-for="category in categories"
              :key="category._id"
              class="list-group-item"
            >
              {{ category.type }}
            </li>
          </ul>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script setup>
const categoriesResponse = await useFetch(
  "http://localhost:3000/api/categories"
);

const categories = categoriesResponse.data.value.categories;

const type = ref("");
const onAddCategory = async () => {
  const data = {
    type: type.value,
  };

  await fetch("http://localhost:3000/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
  console.log("Category added successfully");
};
</script>

<style lang="scss" scoped></style>
