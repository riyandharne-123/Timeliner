<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Timeliner Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        v-if="$router.currentRoute.path != '/dashboard/tasks'"
        @click="$router.go(-1)"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item link to="/profile">
            <v-list-item-title
              ><v-icon>mdi-account</v-icon> Profile</v-list-item-title
            >
          </v-list-item>

          <v-list-item link to="/dashboard/tasks">
            <v-list-item-title
              ><v-icon>mdi-format-list-text</v-icon> Tasks By
              Date</v-list-item-title
            >
          </v-list-item>

          <v-list-item link to="/dashboard/tasks/all">
            <v-list-item-title
              ><v-icon>mdi-format-list-text</v-icon> All
              Tasks</v-list-item-title
            >
          </v-list-item>

          <v-list-item link to="/tasks/starred">
            <v-list-item-title
              ><v-icon>mdi-star</v-icon> Starred Tasks</v-list-item-title
            >
          </v-list-item>

          <v-list-item link @click="logout">
            <v-list-item-title
              ><v-icon>mdi-door</v-icon> Logout</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: "AppBar",
    data: () => ({
      drawer: false,
      group: null,
    }),

    watch: {
      group() {
        this.drawer = false;
      },
    },

    methods: {
      logout: function() {
        localStorage.removeItem("token");
        this.$router.push("/");
      },
    },
  };
</script>
