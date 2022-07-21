const express = require("express");
const pasport = require("passport");
const controller = require("../controllers/category");
const router = express.Router();

router.get(
  "/",
  pasport.authenticate("jwt", { session: false }),
  controller.getAll
);
router.get(
  "/:id",
  pasport.authenticate("jwt", { session: false }),
  controller.getById
);
router.delete(
  "/:id",
  pasport.authenticate("jwt", { session: false }),
  controller.remove
);
router.post(
  "/",
  pasport.authenticate("jwt", { session: false }),
  controller.create
);
router.patch(
  "/:id",
  pasport.authenticate("jwt", { session: false }),
  controller.update
);

module.exports = router;
