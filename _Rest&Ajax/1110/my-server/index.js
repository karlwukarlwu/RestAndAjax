const express = require("express")

const app = express()

const STU_ARR = [
    { id: "1", name: "孙悟空", age: 18, gender: "男", address: "花果山" },
    { id: "2", name: "猪八戒", age: 28, gender: "男", address: "高老庄" },
    { id: "3", name: "沙和尚", age: 38, gender: "男", address: "流沙河" }
]

app.use(express.urlencoded({ extended: true }))
// 解析json格式请求体的中间件
app.use(express.json())

app.use((req, res) => {
    // 设置响应头
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST")
    res.setHeader("Access-Control-Allow-Headers", "Content-type")
    // Access-Control-Allow-Origin 设置指定值时只能设置一个
    // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
    // Access-Control-Allow-Methods 允许的请求的方式
    // Access-Control-Allow-Headers 允许传递的请求头
})

// 统一的api
// 定义学生信息的路由
app.get("/students", (req, res) => {
    console.log("收到students的get请求")
    // 返回学生信息
    res.send({
        status: "ok",
        data: STU_ARR
    })
})

// 查询某个学生的路由
app.get("/students/:id", (req, res) => {
    const id = req.params.id
    const stu = STU_ARR.find((item) => item.id === id)

    // 将数据返回
    res.send({
        status: "ok",
        data: stu
    })
})

// 定义一个添加学生的路由
app.post("/students", (req, res) => {
    console.log("收到students的post请求", req.body)
    // 获取学生的信息
    const { name, age, gender, address } = req.body
    // 创建学生信息
    const stu = {
        id: +STU_ARR.at(-1).id + 1 + "",
        name,
        age: +age,
        gender,
        address
    }

    // 将学生信息添加到数组
    STU_ARR.push(stu)

    // 添加成功
    res.send({
        status: "ok",
        data: stu
    })
})

// 定义一个删除学生的路由 根据id删除学生
// app.delete()
app.delete("/students/:id", (req, res) => {
    // 获取学生的id
    const id = req.params.id

    // 遍历数组
    for (let i = 0; i < STU_ARR.length; i++) {
        if (STU_ARR[i].id === id) {
            const delStu = STU_ARR[i]
            STU_ARR.splice(i, 1)
            // 数据删除成功
            res.send({
                status: "ok",
                data: delStu
            })
            return
        }
    }

    // 如果执行到这里，说明学生不存在
    res.status(403).send({
        status: "error",
        data: "学生id不存在"
    })
})

// 定义一个修改学生的路由
// app.put()
app.put("/students", (req, res) => {
    // 获取数据
    const { id, name, age, gender, address } = req.body

    // 根据id查询学生
    const updateStu = STU_ARR.find((item) => item.id === id)

    if (updateStu) {
        updateStu.name = name
        updateStu.age = age
        updateStu.gender = gender
        updateStu.address = address

        res.send({
            status: "ok",
            data: updateStu
        })
    } else {
        res.status(403).send({
            status: "error",
            data: "学生id不存在"
        })
    }
})

app.listen(3000, () => {
    console.log("服务器已经启动！")
})
