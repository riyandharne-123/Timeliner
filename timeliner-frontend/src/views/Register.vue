<template>
  <div>
    <AppBar />
    <RegisterForm />
  </div>
</template>

<script>
  import AppBar from "../components/Auth/AppBar";
  import RegisterForm from "../components/Auth/RegisterForm";

  export default {
    name: "Register",

    components: {
      AppBar,
      RegisterForm,
    },
  };
</script>
