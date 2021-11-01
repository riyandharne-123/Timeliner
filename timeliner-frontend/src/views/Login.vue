<template>
  <div>
    <AppBar />
    <LoginForm />
  </div>
</template>

<script>
  import AppBar from "../components/Auth/AppBar";
  import LoginForm from "../components/Auth/LoginForm";

  export default {
    name: "Login",

    components: {
      AppBar,
      LoginForm,
    },
  };
</script>
