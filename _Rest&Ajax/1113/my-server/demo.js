// 引入jwt
const jwt = require("jsonwebtoken")

// 创建一个对象
const obj = {
    name: "swk",
    age: 18,
    gender: "男"
}

// 使用jwt来对json数据进行加密
const token = jwt.sign(obj, "hellohellohowyou", {
    expiresIn: "1"
})
try {
    //服务器收到客户端的token后
    const decodeData = jwt.verify(token, "hellohellohowyou")

    console.log(decodeData)
} catch (e) {
    // 说明token解码失败，说明token
    console.log("无效的token")
}
