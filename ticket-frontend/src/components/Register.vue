<template>
  <div>
    <div class="card">
      <div class="card-body bg-light">
        <h5 class="card-title text-danger fs-3">REGISTER</h5>
        <form class="row g-2">
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Name</label>
            <input
              :v-model="name"
              type="email"
              class="form-control"
              id="inputEmail4"
            />
          </div>
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Surname</label>
            <input
              :v-model="surname"
              type="email"
              class="form-control"
              id="inputEmail4"
            />
          </div>
          <div class="col-md-6">
            <label :v-model="email" for="inputEmail4" class="form-label"
              >Email</label
            >
            <input type="email" class="form-control" id="inputEmail4" />
          </div>
          <div class="col-md-6">
            <label for="inputPassword4" class="form-label">Password</label>
            <input
              :v-model="password"
              type="password"
              class="form-control"
              id="inputPassword4"
            />
          </div>
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Company</label>
            <input
              :v-model="company"
              type="email"
              class="form-control"
              id="inputEmail4"
            />
          </div>
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Role</label>
            <select
              class="form-select"
              v-model="selectedValue"
              aria-label="Default select example"
            >
              <option selected>User</option>
              <option value="1">Admin</option>
            </select>
          </div>
          <div class="d-flex bd-highlight mb-3">
            <div class="me-auto p-2 bd-highlight">
              <button type="submit" class="btn btn-danger">Sign Up</button>
            </div>
            <div class="p-2 bd-highlight">
              <p class="text-danger fs-5" v-on:click="changeFormButton">
                Go Back
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  props: {
    changeFormButton: String,
    name:String,
    surname:String,
    email: String,
    password: String,
    company: String
  },
  created() {
    console.log(this.selectedValue);
  },
  data() {
    return {
      selectedValue: null,
      options: [
        { value: 0, text: "User Role" },
        { value: 1, text: "Admin Role" },
      ],
    };
  },
};
</script>

<style scoped>
</style>