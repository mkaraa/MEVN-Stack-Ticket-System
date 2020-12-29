export function isLoggedOut() {
    localStorage.setItem("token", "");
    this.$router.push("/login");
}