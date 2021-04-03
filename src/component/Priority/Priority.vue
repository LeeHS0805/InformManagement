
<template>
  <view class="priority" :style="{backgroundColor: test[status].color}">
    {{ test[status].text }}
  </view>
</template>

<script>
import "./Priority.scss"

export default {
  name: "tag",
  props: {
    status: '',
  },
  data() {
    return {
      test: [{text:'普通',color:'#1f57ff'},{text:'重要',color:'orange'},{text:'紧急',color:'red'}]
    }
  },
  mounted() {
    console.log(this.status)
  }
}
</script>

