<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" sm="4">
        <v-card class="card">
          <v-form @submit.prevent="login()">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="E-mail"
                    type="email"
                    color="deep-purple accent-4"
                    prepend-icon="mdi-email"
                    v-model="email"
                    :error-messages="this.errors.email"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Password"
                    type="password"
                    color="deep-purple accent-4"
                    prepend-icon="mdi-lock"
                    v-model="password"
                    :error-messages="this.errors.password"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    color="deep-purple accent-4"
                    dense
                    dark
                    style="margin-right: 5px;"
                    type="submit"
                  >
                    <v-icon>mdi-login</v-icon> Login
                  </v-btn>

                  <v-btn
                    color="deep-purple accent-4"
                    dense
                    dark
                    link
                    to="/register"
                  >
                    <v-icon>mdi-account-plus</v-icon> Or Register
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    color="deep-purple accent-4"
                    dense
                    dark
                    block
                    @click="googleLogin"
                  >
                    <v-icon>mdi-google</v-icon> Login With Google
                  </v-btn>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <Alert :message="message" :alert="alert" />
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
  import Alert from "./Alert.vue";
  import firebase from "firebase/compat/app";
  import "firebase/compat/auth";

  export default {
    name: "LoginForm",
    components: {
      Alert,
    },
    data: () => ({
      email: "",
      password: "",
      alert: false,
      message: "",
      errors: [],
    }),
    methods: {
      login(google) {
        this.$axios
          .post(this.$api + "/login", {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            this.$store.commit("user", res.data.user);
            this.$store.commit("tasks", res.data.tasks);
            const jwtToken = `Bearer ${localStorage.getItem("token")}`;
            this.$axios.defaults.headers.common["authorization"] = jwtToken;
            this.errors = "";
            this.alert = false;
            this.$router.push("/dashboard/tasks");
          })
          .catch((err) => {
            if (google) {
              this.email = "";
              this.password = "";
            }
            if (!err.response.data.message.errors) {
              this.errors = "";
              this.message = err.response.data.message;
              this.alert = true;
            } else {
              this.errors = err.response.data.message.errors;
            }
            setTimeout(() => {
              this.alert = false;
            }, 5000);
          });
      },
      googleLogin() {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            let user = result.user;
            this.name = user.displayName;
            this.email = user.email;
            this.password = user.uid;
            this.login(true);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  };
</script>

<style scoped>
  .card {
    margin: 20px;
    margin-top: 10%;
  }
</style>
