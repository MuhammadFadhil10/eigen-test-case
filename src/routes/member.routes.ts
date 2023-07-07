import Controller from "../controller/controller";
import express from "express";

const router = express.Router();

const { MemberController } = Controller;

router.get("/members", MemberController.getAllMembers);

export default router;
