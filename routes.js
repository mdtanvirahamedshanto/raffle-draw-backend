const {
  sellSingleTicket,
  sellBulkTicket,
  updateById,
  deleteById,
  deleteBulk,
  winner,
  findAll,
  findById,
  findByUsername,
} = require("./controllers/ticketController");

const router = require("express").Router();

router.route("/t/:id").get(findById).put(updateById).delete(deleteById);

router
  .route("/u/:username")
  .get(findByUsername)
  .put(updateById)
  .delete(deleteBulk);
router.route("/").get(findAll).post(sellSingleTicket);
router.post("/bulk", sellBulkTicket);
router.get("/draw", winner);

module.exports = router;
