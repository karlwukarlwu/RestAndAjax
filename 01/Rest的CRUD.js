const express = require("express")
const app = express()
const STU_ARR = [
    { id: "1", name: "孙悟空", age: 18, gender: "男", address: "花果山" },
    { id: "2", name: "猪八戒", age: 28, gender: "男", address: "高老庄" },
    { id: "3", name: "沙和尚", age: 38, gender: "男", address: "流沙河" }
]
app.use(express.urlencoded())
// x-www-form-urlencoded 这个请求发送的时候不用引入express.json()，
// 但是用raw的时候就要引入express.json()
app.use(express.json())
//查询
app.get("/students", (req, res) => {
    //在前后端不分离的情况下 返回给ejs
    // res.render....
    //在前后端分离的情况下 rest风格的写法 只返回数据
    res.send({
        status: "ok",
        data: STU_ARR
    })
})
//添加 post
app.post("/students", (req, res) => {
    console.log(req.body)
    // 获取学生的信息
    const {name, age, gender, address} = req.body
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

    // console.log(STU_ARR)
    // 添加成功
        //以前是添加完了之后返回一个页面
        //前后端分离以后添加成功直接给前端返回一个数据即可
    res.send({
        status: "ok",
        data: stu
    })
})

//删除 delete
app.delete("/students/:id", (req, res) => {
    //获取id
    const id = req.params.id
    //根据id删除学生信息
    //找不到返回-1
    const index = STU_ARR.findIndex((item) => item.id === id)
    console.log(index)
    if(index === -1) {
        res.send({
            status: "fail",
            msg: "删除失败"
        })
        return
    }
    let delArr = STU_ARR.splice(index, 1)
    //返回数据
    res.send({
        status: "ok",
        delArr
    })
})


//查询一个 get
app.get("/students/:id", (req, res) => {
    //路径参数用req.params 拿到
    const id = req.params.id
    // 根据id查询学生信息
    const stu = STU_ARR.find((item) => item.id === id)
    // 将数据返回
    res.send({
        status: "ok",
        data: stu
    })

})

//修改 用put
app.put("/students", (req, res) => {
    //可以路径参数拿到id，也可以从请求体拿这个
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