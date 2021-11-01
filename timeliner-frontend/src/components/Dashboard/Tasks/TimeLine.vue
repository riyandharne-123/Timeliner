<template>
  <TimeLineComponent :tasks="tasks" />
</template>

<script>
  import TimeLineComponent from "../Timeline/Index.vue";

  export default {
    name: "TimeLine",
    data: () => ({
      tasks: [],
    }),
    components: {
      TimeLineComponent,
    },
    mounted() {
      this.$axios
        .get(this.$api + `/tasks/filter?date=${this.$route.params.date}`)
        .then((res) => {
          this.tasks = res.data.tasks;
        });
    },
  };
</script>
