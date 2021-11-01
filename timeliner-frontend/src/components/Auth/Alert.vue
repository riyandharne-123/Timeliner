<template>
  <div>
    <v-alert
      v-model="alert"
      border="left"
      colored-border
      color="deep-purple accent-4"
      elevation="2"
    >
      {{ this.message }}
    </v-alert>
  </div>
</template>

<script>
  export default {
    name: "Alert",
    props: ["message", "alert"],
  };
</script>
