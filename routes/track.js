const express = require("express");
const router = express.Router();
const options = {
  timeZone: "Asia/Shanghai",
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false // 使用24小时制
};

// GET /api/tracks?plateNo=川8888885&start=2025-09-29T08:00:00&end=2025-09-29T20:00:00&collection=20250921&dataSource=local
router.get("/", async (req, res) => {
  const { plateNo, start, end, collectionDate, dataSource } = req.query;
  if (!plateNo || !start || !end || !collectionDate || !dataSource) {
    return res.status(400).json({ msg: "参数缺失" });
  }
  console.log("Received params:", { plateNo, start, end, collectionDate, dataSource });

  try {
    const db = req.app.locals.dbs?.[dataSource];

    if (!db) {
      return res.status(400).json({ msg: "无效的数据源" });
    }

    const collection = db.collection("xn_m_vehicle_last_location" + collectionDate);

    const docs = await collection.find({
      vno: plateNo,
      utc: { $gte: new Date(start).getTime(), $lte: new Date(end).getTime() }
    })
    .sort({ locationTime: 1 })
    .toArray();

    console.log("cnt:", docs.length);

    res.json({
      code: 0,
      msg: "成功",
      data: {
        arrLocationInfo: docs.map(d => ({
          id: d._id,
          longitude: d.lon,
          latitude: d.lat,
          locationTime: new Date(d.utc).toLocaleString("zh-CN", options).replaceAll("/", "-"),
          crt: new Date(d.createDate).toLocaleString("zh-CN", options).replaceAll("/", "-")
        }))
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "服务器错误" });
  }
});

module.exports = router;
