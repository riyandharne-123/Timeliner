<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-text class="deep-purple--text">
            <p class="text-h6">Name: {{ user.name }}</p>
            <p class="text-h6">Email: {{ user.email }}</p>
            <p class="text-h6">Total Tasks For Today: {{ tasks.count }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br />
    <v-card class="mx-auto">
      <v-card-text class="deep-purple--text">
        <p class="text-h6">
          Todays Tasks
        </p>
      </v-card-text>
      <TimeLineComponent :tasks="tasks.rows" v-if="tasks.count > 0" />
      <v-card-text class="deep-purple--text" v-else>
        <p class="text-h6">
          You Have No Tasks For Today
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import TimeLineComponent from "../Timeline/Index.vue";

  export default {
    name: "ProfileComponent",
    data: () => ({
      user: [],
      tasks: [],
    }),
    components: {
      TimeLineComponent,
    },
    mounted() {
      this.user = this.$store.state.user;
      this.$axios.get(this.$api + "/user/profile").then((res) => {
        this.tasks = res.data.tasks;
      });
    },
  };
</script>
