<template>
  <div>
    <nav-bar />
    <div class="form-container">
      <div v-if="isLoginPage">
        <div>
          <div class="card">
            <div class="card-body bg-light">
              <h5 class="card-title text-danger fs-3">LOGIN</h5>
              <form class="row g-2">
                <div class="col-md-12">
                  <label for="inputEmail4" class="form-label">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div class="col-md-12">
                  <label for="inputPassword4" class="form-label"
                    >Password</label
                  >
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                  />
                </div>
                <div class="d-flex bd-highlight mb-3">
                  <div class="me-auto p-2 bd-highlight">
                    <p @click="login" class="btn btn-danger">Sign In</p>
                  </div>
                  <div class="p-2 bd-highlight">
                    <p class="text-danger fs-5" v-on:click="changeFormButton">
                      Register
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="card">
          <div class="card-body bg-light">
            <h5 class="card-title text-danger fs-3">REGISTER</h5>
            <form v-on:submit.prevent="register" class="row g-2">
              <div class="col-md-6">
                <label for="inputEmail" class="form-label">Name</label>
                <input v-model="name" class="form-control" id="inputEmail" />
              </div>
              <div class="col-md-6">
                <label for="inputEmail2" class="form-label">Surname</label>
                <input
                  v-model="surname"
                  class="form-control"
                  id="inputEmail2"
                />
              </div>
              <div class="col-md-6">
                <label for="inputEmail3" class="form-label">Email</label>
                <input
                  v-model="emailRegister"
                  type="email"
                  class="form-control"
                  id="inputEmail3"
                />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Password</label>
                <input
                  v-model="passwordRegister"
                  type="password"
                  class="form-control"
                  id="inputPassword4"
                />
              </div>
              <div class="col-md-6">
                <label for="inputEmail5" class="form-label">Company</label>
                <input
                  v-model="company"
                  class="form-control"
                  id="inputEmail5"
                />
              </div>
              <div class="col-md-6">
                <label for="inputEmail6" class="form-label">Role</label>
                <select
                  class="form-select"
                  v-model="selectedValue"
                  aria-label="Choose Role"
                >
                  <option value=1>User</option>
                  <option value=0>Admin</option>
                </select>
              </div>
              <div class="d-flex bd-highlight mb-3">
                <div class="me-auto p-2 bd-highlight">
                  <button class="btn btn-danger">
                    Sign Up
                  </button>
                </div>
                <div v-if="isRegisterComplete" class="me-auto p-2 bd-highlight">
                  <p class="text-success">{{ registerMessage }}</p>
                </div>
                <div class="p-2 bd-highlight">
                  <p class="text-danger fs-5" v-on:click="changeFormButton">
                    Go Back To Login
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <footer-bar />
  </div>
</template>

<script>
import NavbarVue from "./Navbar.vue";
import axios from "axios";
import FooterVue from "./Footer.vue";

export default {
  name: "LoginScreen",
  props: {
    msg: String,
  },
  components: {
    "nav-bar": NavbarVue,
    "footer-bar": FooterVue,
  },
  data() {
    return {
      name: "",
      surname: "",
      emailRegister: "",
      passwordRegister: "",
      company: "",
      role: "",
      selectedValue: "",
      footer: "../../images/mevn.jpg",
      isLoginPage: true,
      email: "",
      password: "",
      registerMessage: "You are successfully registered.",
      isRegisterComplete: false,
    };
  },
  methods: {
    changeFormButton() {
      this.isLoginPage = !this.isLoginPage;
    },
    login: function () {
      axios
        .post("http://localhost:5000/ticket/api/login", {
          email: "user@gmail.com",
          password: "1234",
        })
        .then((response) => {
          if (response.status == 200) {
            localStorage.setItem("token", response.data.token);
            this.$router.push("/home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    register: function () {
      let data = {
        name: this.name,
        surname: this.surname,
        email: this.emailRegister,
        password: this.passwordRegister,
        company: this.company,
        role: this.selectedValue,
      };
      console.log(data);
      axios
        .post("http://localhost:5000/ticket/api/register", data)
        .then((response) => {
          if (response.status == 200) {
            this.name= "";
            this.surname= "";
            this.emailRegister= "";
            this.passwordRegister= "";
            this.company= "";
            this.selectedValue= "";
    
            this.isRegisterComplete = true;
            this.$router.push("/home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-container {
  margin: auto;
  padding: 30px;
}
.footer-container {
  height: 200px;
  width: 50%;
  object-fit: fill;
}
.footer-img {
  width: 200px;
  height: 100px;
}
</style>
