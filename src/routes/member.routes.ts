import Member from "../entity/member.entity";
import express from "express";

const router = express.Router();

router.get("/members", async (_req, res) => {
  const members = await Member.find();

  return res.status(200).json({ data: members });
});

export default router;
