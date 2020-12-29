<template>
  <div>
    <nav-bar />

    <div class="col-md-6 m-4 card float-left">
      <h5 class="card-header p-3">{{ allTickets.name }}</h5>
      <div class="card-body">
        Status:
        <span v-if="allTickets.status == 'Open'" class="text-danger fs-4"
          >{{ allTickets.status }} </span
        ><span
          v-else-if="allTickets.status == 'Pending'"
          class="text-warning fs-4"
          >{{ allTickets.status }}
        </span>
        <span v-if="allTickets.status == 'Closed'" class="text-success fs-4"
          >{{ allTickets.status }}
        </span>
        <p class="card-text">
          Description:<span class="text-danger fs-5">
            {{ allTickets.description }}
          </span>
        </p>
        <footer class="blockquote-footer">
          Ticket Holder:
          <cite title="Source Title"> {{ allTickets.user_name }} </cite>
        </footer>

        <div class="card bg-warning">
          <div class="card-header bg-light text-secondary fs-5">
            Admin Response
          </div>
          <div class="card-body">
            <div>
              <label for="inputEmail5" class="form-label">Response:</label>
              <input v-model="response" class="form-control" id="inputEmail5" />
            </div>
            <div>
              <label for="inputEmail6" class="form-label">Status:</label>
              <select
                class="form-select"
                v-model="selectedValue"
                aria-label="Choose Role"
              >
                <option value="Open">Open</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div class="row-md-6 mt-4 form-group">
              <label for="file"
                >Add File
                <span class="text-warning fs-6">(Optional)</span>
              </label>
              <br />
              <input
                type="file"
                ref="file"
                class="form-control-file"
                v-on:change="handleFileUpload()"
                id="file"
              />
            </div>
            <div class="row-md-6 mt-4">
              <button
                @click="responseTicket()"
                class="floating-card btn btn-success"
              >
                Response Ticket
              </button>
              <button @click="goBack()" class="floating-card btn btn-danger">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavbarVue from "./Navbar.vue";

export default {
  components: {
    "nav-bar": NavbarVue,
  },
  props: {
    isLoginPage: String,
  },
  data() {
    return {
      showButton: false,
      allTickets: {},
      response: "",
      selectedValue: "",
      file: "",
    };
  },
  created() {
    this.getAllTickets();
  },
  methods: {
    logout: function () {
      localStorage.setItem("token", "");
      this.$router.push("/login");
    },
    isLoggedIn() {
      // TODO: jwt dogru mu ve exprire mi değil mi check et ona gore return
      var isLogged = true;

      if (localStorage.getItem("token") == "") {
        isLogged = false;
      }
      return isLogged;
    },
    getAllTickets: function () {
      let id = this.$route.params.id;
      console.log(id);
      axios
        .get("http://localhost:5000/ticket/api/getById/" + id, {
          headers: {
            "auth-token": this.isLoggedIn()
              ? localStorage.getItem("token")
              : this.logout(),
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.allTickets = response.data;
            console.log(this.allTickets);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    responseTicket: function () {
      let id = this.$route.params.id;

      let formData = new FormData();
      formData.append("response", this.response);
      formData.append("status", this.selectedValue);
      if (this.$refs.file.files.length != 0) {
        formData.append("responseFile", this.file);
      }
      axios
        .post(
          "http://localhost:5000/ticket/api/responseTicket/" + id,
          formData,
          {
            headers: {
              "auth-token": this.isLoggedIn()
                ? localStorage.getItem("token")
                : this.logout(),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log("Admin response is successfull");
          this.$router.push("/home");
        })
        .catch((err) => {
          console.log("Response ticket failure", err);
        });
    },
    goBack: function () {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.floating-card {
  float: left;
  margin-left: 10px;
}
</style>