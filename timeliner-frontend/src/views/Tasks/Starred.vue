<template>
  <div>
    <AppBar />
    <StarredTaskList />
  </div>
</template>

<script>
  import StarredTaskList from "../../components/Dashboard/Tasks/Starred.vue";
  import AppBar from "../../components/Dashboard/AppBar";

  export default {
    name: "Starred",
    components: {
      StarredTaskList,
      AppBar,
    },
  };
</script>
3
