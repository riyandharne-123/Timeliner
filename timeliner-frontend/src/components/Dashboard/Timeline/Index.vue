<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item
            v-for="(task, i) in tasks"
            :key="task.id"
            color="deep-purple accent-4"
            icon="mdi-book-variant"
            fill-dot
          >
            <v-row class="pt-1">
              <v-col cols="3">
                <strong style="color: #6200ea;">{{
                  new Date(
                    `${task.date} ${task.time}`
                  ).toLocaleTimeString("en-US", {
                    hour12: true,
                    hour: "numeric",
                    minute: "numeric",
                    seconds: "numeric",
                  })
                }}</strong>
              </v-col>
              <v-col cols="9">
                <v-card color="deep-purple accent-4" dark>
                  <v-card-title class="text-h6">
                    {{ task.name }}
                  </v-card-title>
                  <v-card-text class="white text--primary">
                    <v-row>
                      <v-col cols="3">
                        <v-btn
                          color="deep-purple accent-4"
                          class="mx-0"
                          outlined
                          link
                          :to="'/dashboard/tasks/' + task.id"
                        >
                          <v-icon>mdi-eye</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="3">
                        <v-btn
                          color="deep-purple accent-4"
                          class="mx-5"
                          outlined
                          link
                          :to="'/dashboard/tasks/edit/' + task.id"
                        >
                          <v-icon>mdi-pen</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "TimeLineComponent",
    props: ["tasks"],
  };
</script>
