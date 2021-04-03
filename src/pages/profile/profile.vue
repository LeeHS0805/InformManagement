<template>
  <view></view>
</template>

<script>
import store from "../../store/store";

export default {
  data () {
    return {

    }
  },

  components: {

  },

  methods: {

  },

  created () {
    // let app = getApp()
    console.log(store.state.count)
  }
}
</script>

<style scoped>

</style>
