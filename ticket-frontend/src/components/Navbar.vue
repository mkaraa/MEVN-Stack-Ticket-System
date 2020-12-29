<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand text-danger fs-3" href="#">Tickets</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active text-danger" aria-current="page" href="#"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-danger" href="#">Link</a>
          </li>
        </ul>
        <!-- <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form> -->
        <div :v-if="showButton">
          <button
            @click="logout"
            type="submit"
            :disabled="isLoginPage"
            class="btn btn-danger"
          >
            log out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
//import isLoggedIn from '../utils/isLoggedIn';

export default {
  name: "Navbar",
  props: {
    showButton: String,
  },
  data() {
    return {
      isLoginPage: false,
    };
  },
  methods: {
    logout() {
      localStorage.setItem("token", "");
      this.$router.push("/login");
    },
  },
};
</script>