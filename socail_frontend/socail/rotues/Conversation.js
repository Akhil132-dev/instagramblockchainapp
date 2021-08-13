import express from "express";
import Conversataion from "../model/Conversataion.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const newconversation = await new Conversataion({
    members: [req.body.senderId, req.body.reciverId],
  });

  try {
    const saveconverstation = await newconversation.save();
    res.status(200).json(saveconverstation);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/:userId", async (req, res) => {
  try {
    const conversataion = await Conversataion.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversataion);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
