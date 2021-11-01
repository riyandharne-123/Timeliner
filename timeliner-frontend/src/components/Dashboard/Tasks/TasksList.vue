<template>
  <div>
    <div v-if="tasks.length > 0">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-list two-line>
            <v-list-item-group active-class="deep-purple--text">
              <template v-for="(task, index) in tasks">
                <v-list-item :key="task.id">
                  <v-list-item-content>
                    <v-list-item-title v-text="task.name"></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="
                        new Date(task.date).toDateString() +
                          ' | ' +
                          new Date(
                            `${task.date} ${task.time}`
                          ).toLocaleTimeString()
                      "
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                      v-html="task.description"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-btn
                        color="deep-purple accent-4"
                        class="mx-0"
                        outlined
                        link
                        :to="'/dashboard/tasks/' + task.id"
                      >
                        <v-icon>mdi-eye</v-icon>
                      </v-btn>

                      <v-btn
                        color="deep-purple accent-4"
                        class="mx-5"
                        outlined
                        link
                        :to="'/dashboard/tasks/edit/' + task.id"
                      >
                        <v-icon>mdi-pen</v-icon>
                      </v-btn>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action
                    v-if="task.starred == 0"
                    @click="star(index, task.id)"
                  >
                    <v-icon color="grey lighten-1">
                      mdi-star-outline
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-action v-else @click="unstar(index, task.id)">
                    <v-icon color="yellow darken-3">
                      mdi-star
                    </v-icon>
                  </v-list-item-action>
                </v-list-item>

                <v-divider v-if="tasks.length > 0" :key="index"></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="text-center">
            <v-pagination
              color="deep-purple accent-4"
              v-model="page"
              :length="total_page"
              @input="handlePageChange"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
    </div>
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
    name: "TasksList",
    data: () => ({
      tasks: [],
      page: 1,
      total_page: 1,
    }),
    mounted() {
      this.$axios
        .get(this.$api + `/tasks/get/all`, {
          params: {
            page: this.page,
            per_page: 4,
          },
        })
        .then((res) => {
          this.tasks = res.data.data;
          this.page = res.data.pagination.current_page;
          this.total_page = res.data.pagination.total_page;
        });
    },
    methods: {
      star(id, taskId) {
        this.$axios.put(this.$api + `/tasks/star/${taskId}`).then((res) => {
          this.tasks[0].starred = 1;
          this.$store.dispatch("getStarredTasks");
        });
      },
      unstar(id, taskId) {
        this.$axios.put(this.$api + `/tasks/unstar/${taskId}`).then((res) => {
          this.tasks[0].starred = 0;
          this.$store.dispatch("getStarredTasks");
        });
      },
      handlePageChange(value) {
        this.$axios
          .get(this.$api + `/tasks/get/all`, {
            params: {
              page: this.page,
              per_page: 4,
            },
          })
          .then((res) => {
            this.tasks = res.data.data;
            this.page = res.data.pagination.current_page;
            this.total_page = res.data.pagination.total_page;
          });
      },
    },
  };
</script>
