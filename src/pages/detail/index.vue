<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import ws from "../../tools/websocket.js";

const title = ref("当前为详情页");

let socket = ws("wss://xxxx", () => {
  // 初始化，建立链接,此处为链接失败的业务逻辑
});

onBeforeRouteLeave((to, from, next) => {
  // 离开当前页面，断开链接
  socket?.close();
  console.log("socket", socket);
  socket = null;
  next();
});
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
