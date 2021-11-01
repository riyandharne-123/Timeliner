<template>
  <div>
    <v-list two-line v-if="tasks.length > 0">
      <v-list-item-group active-class="deep-purple--text">
        <template v-for="(task, index) in tasks">
          <v-list-item :key="task.date">
            <v-list-item-content>
              <v-list-item-title
                v-text="new Date(task.date).toDateString()"
              ></v-list-item-title>
            </v-list-item-content>
            <v-btn
              color="deep-purple accent-4"
              dense
              dark
              link
              :to="'/dashboard/tasks/' + task.date + '/timeline'"
            >
              <v-icon>mdi-eye</v-icon> View Tasks
            </v-btn>
          </v-list-item>

          <v-divider v-if="tasks.length > 0" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <v-container v-else>
      <v-card class="mx-auto">
        <v-card-text class="deep-purple--text">
          <p class="text-h6">
            You Have No Tasks
          </p>
        </v-card-text>
      </v-card>
    </v-container>
    <v-btn
      class="mx-2"
      fab
      dark
      color="deep-purple accent-4"
      bottom
      fixed
      right
      link
      to="/dashboard/tasks/create"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: "TaskList",
    computed: {
      tasks() {
        return this.$store.state.tasks;
      },
    },
    mounted() {
      if (this.tasks.length < 1) {
        this.$store.dispatch("getTasks");
      }
    },
  };
</script>
