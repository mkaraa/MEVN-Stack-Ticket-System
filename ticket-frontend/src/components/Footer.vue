<template>
  <div>
    <nav class="navbar sticky-bottom navbar-light bg-light">
      <div class="d-flex bd-highlight mb-3">
        <div class="mr-auto p-2 bd-highlight">
          <p class="text-danger fs-1">
            Tickets
            <span class="text-dark fs-4"> Powered By</span>
          </p>
        </div>
        <div class="p-2 bd-highlight">
          <img
            src="../../images/mevn-3.jpeg"
            class="rounded footer-img"
            alt="MEVN"
          />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: "Footer",
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
