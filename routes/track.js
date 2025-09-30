const express = require("express");
const router = express.Router();

// GET /api/tracks?plateNo=川8888885&start=2025-09-29T08:00:00&end=2025-09-29T20:00:00&collection=20250921
router.get("/", async (req, res) => {
  const { plateNo, start, end, collectionDate } = req.query;
  if (!plateNo || !start || !end || !collectionDate) {
    return res.status(400).json({ msg: "参数缺失" });
  }
  console.log("Received params:", { plateNo, start, end, collectionDate });

  try {
    const db = req.app.locals.db;
    const collection = db.collection("xn_m_vehicle_last_location" + collectionDate);

    // console.log("Querying collection:", "xn_m_vehicle_last_location" + collectionDate);
    // console.log("Query parameters startTime:", start, new Date(start).getTime());
    // console.log("Query parameters endTime:", end, new Date(end).getTime());

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
          locationTime: new Date(d.utc).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }).replaceAll("/", "-"),
          crt: new Date(d.createDate).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }).replaceAll("/", "-")
        }))
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "服务器错误" });
  }
});

module.exports = router;
