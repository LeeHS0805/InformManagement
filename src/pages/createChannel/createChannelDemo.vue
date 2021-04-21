<template>
 <view>
  <AtTag
    name='tag-1'
    type='primary'
    circle
    :onClick="onClick"
  >tag-1</AtTag>
 </view>
</template>
<script>
export default {
  name: 'AtTagDemo',
  methods: {
    onClick() {
      console.log('点击了')
    }
  }
}
</script>

