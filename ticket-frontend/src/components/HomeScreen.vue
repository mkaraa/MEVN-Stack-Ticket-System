<template>
  <div>
    <nav-bar />
    <div v-if="newTicketForm">
      <div class="d-flex align-items-start col-md-10">
        <div class="col-md-4">
          <button @click="newTicket" class="btn btn-primary m-4 col-md-8">
            Create A New Ticket
          </button>
        </div>
        <div class="col-md-6">
          <input
            class="form-control danger mr-sm-2 mt-4"
            type="text"
            v-model="search"
            placeholder="Search tickets by status or name or customer name..."
          />
        </div>
      </div>
    </div>
    <div v-else class="card bg-light col-md-11 m-4">
      <div class="card-body">
        <form v-on:submit.prevent="register" class="row g-2">
          <div class="row-md-6">
            <label for="newTicketTitle" class="form-label">Title</label>
            <input
              v-model="newTicketTitle"
              class="form-control"
              id="newTicketTitle"
            />
          </div>
          <div class="row-md-6">
            <label for="newTicketDescription" class="form-label"
              >Description</label
            >
            <input
              v-model="newTicketDescription"
              class="form-control"
              id="newTicketDescription"
            />
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
          <div class="row-md-6">
            <button
              @click="createNewTicket()"
              class="btn btn-success mt-4 floating-card"
            >
              Create A New Ticket
            </button>
            <button
              @click="newTicket()"
              class="btn btn-danger mt-4 floating-card"
            >
              Cancel
            </button>
            <span v-if="newTicketSuccessMessage" class="text-success fs-4"
              >You successfully create a new ticket</span
            >
          </div>
        </form>
      </div>
    </div>

    <div v-for="item in filteredTickets" class="floating-card m-4 card">
      <h5 class="card-header p-3">{{ item.name }}</h5>
      <div class="card-body">
        <footer class="blockquote-footer p-2">
          Ticket Holder:
          <cite title="Source Title"> {{ item.user_name }} </cite>
        </footer>
        <h5 v-if="item.status == 'Open'" class="card-title">
          Status: <span class="text-danger fs-4">{{ item.status }} </span>
        </h5>
        <h5 v-if="item.status == 'Closed'" class="card-title">
          Status: <span class="text-success fs-4">{{ item.status }} </span>
        </h5>
        <h5 v-if="item.status == 'Pending'" class="card-title">
          Status: <span class="text-warning fs-4">{{ item.status }} </span>
        </h5>
        <h5 class="card-text">
          Description:
          <span class="text-info fs-5">{{ item.description }}</span>
        </h5>

        <div v-if="item.files != ''">
          <a
            :href="preparePreviewLink(item.files)"
            target="_blank"
            class="text-danger fs-5 m-2"
          >
            Preview Attachment File</a
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-folder text-danger"
            viewBox="0 0 16 16"
          >
            <path
              d="M.54 3.87L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"
            />
          </svg>
        </div>
        <div v-else>
          <span class="text-secondary fs-5"> No file attached.</span>
        </div>

        <div class="card bg-warning mb-4 mt-4">
          <div class="card-header bg-light text-warning fs-4">Admin</div>
          <div class="card-body">
            <h5 class="card-text">
              Admin Response:
              <span v-if="item.response == ''" class="text-danger fs-5">
                -</span
              >
              <span v-else class="text-danger fs-5">
                {{ item.response }}</span
              >
            </h5>
            <h5 class="card-text">
              Admin File:
              <span v-if="item.responseFile == ''" class="text-danger fs-5"
                >-</span
              >
              <span v-else class="text-danger fs-5">
                <a
                  :href="preparePreviewLink(item.responseFile)"
                  target="_blank"
                  class="text-danger fs-5 m-2"
                >
                  Preview Attachment File</a
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-folder text-danger"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M.54 3.87L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"
                  /></svg
              ></span>
            </h5>
          </div>
        </div>

        <button
          v-if="item.user_role == '0'"
          @click="responseTicket(item._id)"
          class="ml-2 btn btn-success invisible"
        >
          Response Ticket
        </button>
        <button
          v-else
          @click="responseTicket(item._id)"
          class="ml-2 btn btn-success floating-card"
        >
          Response Ticket
        </button>
        <button
          @click="responseTicket(item._id)"
          class="ml-2 btn btn-secondary floating-card"
        >
          Send Message
        </button>
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
      search: "",
      allTickets: [],
      newTicketSuccessMessage: false,
      newTicketForm: true,
      newTicketTitle: "",
      newTicketDescription: "",
      file: "",
      apiUrl: process.env.apiUrl,
    };
  },
  created() {
    this.getAllTickets();
  },
  methods: {
    newTicket: function () {
      this.newTicketForm = !this.newTicketForm;
    },
    responseTicket: function (id) {
      console.log(id);
      this.$router.push("/responseTicket/" + id);
    },
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
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    getAllTickets: function () {
      axios
        .get("http://localhost:5000/ticket/api/getAllTickets", {
          headers: {
            "auth-token": this.isLoggedIn()
              ? localStorage.getItem("token")
              : this.logout(),
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.allTickets = response.data;
            console.log("ALL TICKETS", this.allTickets);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createNewTicket: function () {
      // this.files = this.$refs.files.files[0];

      let formData = new FormData();
      formData.append("name", this.newTicketTitle);
      formData.append("description", this.newTicketDescription);
      if (this.$refs.file.files.length != 0) {
        formData.append("files", this.file);
      }
      formData.append("response", "");
      formData.append("responseFile", "");

      axios
        .post("http://localhost:5000/ticket/api/createTicket", formData, {
          headers: {
            "auth-token": this.isLoggedIn()
              ? localStorage.getItem("token")
              : this.logout(),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          //this.newTicketSuccessMessage = true;
          console.log(response);
          this.newTicketForm = true;
          this.getAllTickets();
          this.clearForm();
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
    clearForm() {
      this.newTicketTitle = "";
      this.newTicketDescription = "";
      this.file = "";
    },
    preparePreviewLink(url) {
      return this.apiUrl + "/" + url;
    },
  },
  computed: {
    filteredTickets: function () {
      return this.allTickets.filter((ticket) => {
        if (ticket.status.match(this.search)) {
          return ticket.status.match(this.search);
        } else if (ticket.name.match(this.search)) {
          return ticket.name.match(this.search);
        } else {
          return ticket.user_name.match(this.search);
        }
      });
    },
  },
};
</script>

<style scoped>
.floating-card {
  float: left;
  margin-left: 10px;
  min-width: 250px;
}
</style>