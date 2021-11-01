<template>
  <v-app>
    <v-main>
      <v-progress-linear
        v-if="loading"
        indeterminate
        color="deep-purple accent-4"
      ></v-progress-linear>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: "App",

    data: () => ({
      loading: false,
    }),
    mounted() {
      this.$axios.interceptors.request.use(
        (config) => {
          this.loading = true;
          return config;
        },
        (error) => {
          this.loading = false;
          return Promise.reject(error);
        }
      );

      this.$axios.interceptors.response.use(
        (response) => {
          this.loading = false;
          return response;
        },
        (error) => {
          this.loading = false;
          return Promise.reject(error);
        }
      );
    },
  };
</script>
