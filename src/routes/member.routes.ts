import MemberController from "../controller/member.controller";
import express from "express";

const router = express.Router();

router.get("/members", MemberController.getAllMembers);

export default router;
