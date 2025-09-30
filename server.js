const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const config = require("./config");
const trackRoutes = require("./routes/track");

const app = express();
app.use(cors()); // 允许跨域请求
app.use(express.json());

const path = require("path");

// 静态资源服务：直接暴露根目录
app.use(express.static(__dirname));

// MongoDB 连接
MongoClient.connect(config.mongoUrl, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db(config.dbName);
        app.locals.db = db;
        console.log("✅ 已连接 MongoDB");

        // 注册路由
        app.use("/api/tracks", trackRoutes);

        // 启动服务
        app.listen(config.port, () => {
            console.log(`🚀 服务已启动 http://localhost:${config.port}`);
        });
    })
    .catch(err => {
        console.error("❌ MongoDB 连接失败:", err);
    });

// 定义根路由，指向 index.html（根目录下）
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
