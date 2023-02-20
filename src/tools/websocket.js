const ws = (url, cb) => {
  let tem = uni.connectSocket({
    url,
    success() {
      console.log("websocket连接成功");
    },
    fail(err) {
      console.log("err", err);
    },
  });
  let time = null;
  const doSend = () => {
    // 向服务发送请求 保活操作
    tem.send({
      data: "PING",
      success(res) {
        console.log("消息发送成功", res);
      },
    });
  };
  // 建立websocket连接
  tem.onOpen(() => {
    console.log("WebSocket连接正常打开中...！");
    doSend();
    time = setInterval(() => {
      doSend();
    }, 50_000);
    tem.onMessage((res) => {
      console.log("收到服务器内容：" + JSON.stringify(res));
      if (res.data === "false") {
        tem.close({
          complete: () => {
            cb && cb();
            clearInterval(time);
            tem = null;
          },
        });
      }
    });
  });
  // 监听websocket关闭的事件
  tem.onClose(() => {
    console.log("已经被关闭了");
    clearInterval(time);
    tem = null;
  });
  // 监听发生错误时的时间
  tem.onError(() => {
    console.log("websocket连接失败");
  });

  return tem;
};

export default ws;
