<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-text>
            <p class="text-h4">
              {{ task.name }}
            </p>
            <p class="text-h5">{{ task.date }} | {{ task.time }}</p>
            <div v-html="task.description"></div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="deep-purple accent-4"
              dense
              dark
              block
              @click="dialog = true"
            >
              <v-icon>mdi-delete</v-icon> Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="deep-purple accent-4 white--text">
          Delete This Task?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="deep-purple accent-4 white--text"
            @click="dialog = false"
          >
            No
          </v-btn>
          <v-btn color="deep-purple accent-4 white--text" @click="deleteTask">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    name: "TaskView",
    data: () => ({
      task: [],
      dialog: false,
    }),
    mounted() {
      this.$axios
        .get(this.$api + `/tasks/get/${this.$route.params.id}`)
        .then((res) => {
          this.task = res.data.task;
          this.task.date = new Date(this.task.date).toDateString();
          this.task.time = new Date(
            `${this.task.date} ${this.task.time}`
          ).toLocaleTimeString();
        });
    },
    methods: {
      deleteTask() {
        this.$axios
          .delete(this.$api + `/tasks/delete/${this.task.id}`)
          .then((res) => {
            this.$store.dispatch("getTasks");
            this.$router.push("/dashboard/tasks");
          });
      },
    },
  };
</script>
