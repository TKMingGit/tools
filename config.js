module.exports = {
  // 服务端口
  port: 3001,

  // MongoDB 配置
  mongoConfigs: {
    local: "mongodb://localhost:27017/gps",
    dev: "mongodb://gpsdbuser:HxmZGKYCSm7gYLhX@mongoCluster1.xtm.cn:27017,mongoCluster2.xtm.cn:27017/gps?authSource=admin&authMechanism=SCRAM-SHA-1",
    test: "mongodb://gpsdbuser:HxmZGKYCSm7gYLhX@mongoCluster1.xtm.cn:27017,mongoCluster2.xtm.cn:27017/gps?authSource=admin&authMechanism=SCRAM-SHA-1",
    pre: "mongodb://gpsdbuser:HxmZGKYCSm7gYLhX@mongoCluster1.xtm.cn:27017,mongoCluster2.xtm.cn:27017/gps?authSource=admin&authMechanism=SCRAM-SHA-1"
  }
};
