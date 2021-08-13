import express from "express";
import Messages from "../model/Message.js";
const router = express.Router();
router.post("/", async (req, res) => {
  const newMessage = new Messages(req.body);

  try {
    const saveMessage = await newMessage.save();
    res.status(200).json(saveMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:converstaionId", async (req, res) => {
  try {
    const messages = await Messages.find({
      converstaionId: req.params.converstaionId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});
export default router;
