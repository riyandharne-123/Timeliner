<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" sm="4">
        <v-card class="card">
          <v-form @submit.prevent="register()">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Full Name"
                    type="email"
                    color="deep-purple accent-4"
                    prepend-icon="mdi-account-circle"
                    v-model="name"
                    :error-messages="this.errors.name"
                    required
                  ></v-text-field>
                </v-col>

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
                    <v-icon>mdi-account-plus</v-icon> Register
                  </v-btn>
                  <v-btn color="deep-purple accent-4" dense dark link to="/">
                    <v-icon>mdi-login</v-icon> Or Login
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    color="deep-purple accent-4"
                    dense
                    dark
                    block
                    @click="googleRegister"
                  >
                    <v-icon>mdi-google</v-icon> Register With Google
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <Alert :message="message" :alert="alert" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Alert from "./Alert.vue";
  import firebase from "firebase/compat/app";
  import "firebase/compat/auth";

  export default {
    name: "RegisterForm",
    components: {
      Alert,
    },
    data: () => ({
      name: "",
      email: "",
      password: "",
      alert: false,
      message: "",
      errors: [],
    }),
    methods: {
      register(google) {
        this.$axios
          .post(this.$api + "/register", {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            this.errors = "";
            this.alert = false;
            localStorage.setItem("token", res.data.token);
            this.$store.commit("user", res.data.user);
            const jwtToken = `Bearer ${localStorage.getItem("token")}`;
            this.$axios.defaults.headers.common["authorization"] = jwtToken;
            this.$router.push("/dashboard/tasks");
          })
          .catch((err) => {
            if (google) {
              firebase.auth().signOut();
              this.name = "";
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
      googleRegister() {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            let user = result.user;
            this.name = user.displayName;
            this.email = user.email;
            this.password = user.uid;
            this.register(true);
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
