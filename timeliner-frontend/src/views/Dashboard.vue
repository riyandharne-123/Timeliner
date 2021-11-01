<template>
  <div>
    <AppBar />
    <router-view />
  </div>
</template>

<script>
  import AppBar from "../components/Dashboard/AppBar";

  export default {
    name: "Dashboard",

    components: {
      AppBar,
    },
  };
</script>
