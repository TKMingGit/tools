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

const mongoUrls = {
    local: config.mongoConfigs.local,
    dev: config.mongoConfigs.dev,
    test: config.mongoConfigs.test,
    pre: config.mongoConfigs.pre
};

async function connectAllDbs() {
    const clients = {};
    for (const [key, url] of Object.entries(mongoUrls)) {
        if (!url) continue;

        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        clients[key] = client.db();

        console.log(`✅ 连接到 ${key} 数据库`);
    }
    return clients;
}

connectAllDbs()
    .then(dbs => {
        app.locals.dbs = dbs; // 保存所有数据库连接

        // 注册路由
        app.use("/api/tracks", trackRoutes);

        // 启动服务
        app.listen(config.port, () => {
            console.log(`✅ 服务已启动 http://localhost:${config.port}`);
        });
    })
    .catch(err => {
        console.error("❌ 数据库连接失败:", err);
    });

// 定义根路由，指向 index.html（根目录下）
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
