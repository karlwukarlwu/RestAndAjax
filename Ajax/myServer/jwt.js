// 引入jwt
const jwt = require("jsonwebtoken")

// 创建一个对象
const obj = {
    name: "swk",
    age: 18,
    gender: "男"
}

// 使用jwt来对json数据进行加密
//加密对象 盐值 过期时间(这里面还有别的参数，但是我们主要用过期时间)
const token = jwt.sign(obj, "hellohellohowyou", {
    expiresIn: "1d"
    //用字符串写，单位是毫秒
//     直接写 number 1 是一秒
})

//这个是解码 需要拿到的token和加密的盐值
try {
    //服务器收到客户端的token后
    const decodeData = jwt.verify(token, "hellohellohowyou")

    console.log(decodeData)
} catch (e) {
    // 说明token解码失败，说明token无效
    console.log("无效的token")
}
