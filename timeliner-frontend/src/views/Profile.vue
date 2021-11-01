<template>
  <div>
    <AppBar />
    <ProfileComponent />
  </div>
</template>

<script>
  import AppBar from "../components/Dashboard/AppBar";
  import ProfileComponent from "../components/Dashboard/Profile/Profile.vue";

  export default {
    name: "Profile",
    components: {
      AppBar,
      ProfileComponent,
    },
  };
</script>
