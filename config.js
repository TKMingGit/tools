module.exports = {
  // 服务端口
  port: 3001,

  // MongoDB 配置
  mongoConfigs: {
    local: "mongodb://localhost:27017/gps",
    dev: "mongodb://gpsdbuser:HxmZGKYCSm7gYLhX@10.0.95.24:27017,10.0.95.25:27017/gps?authSource=admin&authMechanism=SCRAM-SHA-1",
    test: "mongodb://gpsdbuser:HxmZGKYCSm7gYLhX@10.0.95.24:27017,10.0.95.25:27017/gps?authSource=admin&authMechanism=SCRAM-SHA-1",
    pre: "mongodb://gpsdbuser:HxmZGKYCSm7gYLhX@10.0.95.24:27017,10.0.95.25:27017/gps?authSource=admin&authMechanism=SCRAM-SHA-1"
  },

  // 高德地图API密钥
  gdKKey: "d604e181c6929b3e48ad62deeddae7f4"
};
