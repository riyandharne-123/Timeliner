<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" sm="4">
        <v-card class="card">
          <v-form @submit.prevent="addTask">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Name"
                    type="text"
                    color="deep-purple accent-4"
                    outlined
                    required
                    v-model="name"
                    :error-messages="errors.name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <vue2-tinymce-editor
                    label="Description"
                    type="description"
                    color="deep-purple accent-4"
                    outlined
                    required
                    v-model="description"
                  ></vue2-tinymce-editor>
                  <label v-if="errors.description" style="color:#ff5252;">{{
                    errors.description[0]
                  }}</label>
                </v-col>

                <v-col cols="12">
                  <v-dialog
                    ref="date_dialog"
                    v-model="date_modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                    color="deep-purple accent-4"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Date"
                        prepend-icon="mdi-calendar"
                        color="deep-purple accent-4"
                        outlined
                        required
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="errors.date"
                      ></v-text-field>
                    </template>

                    <v-date-picker
                      v-model="date"
                      scrollable
                      color="deep-purple accent-4"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="deep-purple accent-4"
                        @click="date_modal = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="deep-purple accent-4"
                        @click="$refs.date_dialog.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>

                <v-col cols="12">
                  <v-dialog
                    ref="time_dialog"
                    v-model="time_modal"
                    :return-value.sync="time"
                    persistent
                    width="290px"
                    color="deep-purple accent-4"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="time"
                        label="Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        color="deep-purple accent-4"
                        required
                        outlined
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="errors.time"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="time_modal"
                      v-model="time"
                      full-width
                      color="deep-purple accent-4"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="deep-purple accent-4"
                        @click="time_modal = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="deep-purple accent-4"
                        @click="$refs.time_dialog.save(time)"
                      >
                        OK
                      </v-btn>
                    </v-time-picker>
                  </v-dialog>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    color="deep-purple accent-4"
                    dense
                    dark
                    block
                    type="submit"
                  >
                    <v-icon>mdi-check</v-icon> Add Task
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { Vue2TinymceEditor } from "vue2-tinymce-editor";

  export default {
    name: "CreateForm",
    components: {
      Vue2TinymceEditor,
    },
    data: () => ({
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      time: null,
      name: "",
      description: "",
      date_modal: false,
      time_modal: false,
      errors: [],
    }),
    methods: {
      addTask() {
        this.$axios
          .post(this.$api + "/tasks/store", {
            name: this.name,
            description: this.description,
            date: this.date,
            time: this.time,
          })
          .then((res) => {
            this.$store.dispatch("getTasks");
            this.$router.go(-1);
          })
          .catch((err) => {
            this.errors = err.response.data.message.errors;
          });
      },
    },
  };
</script>
