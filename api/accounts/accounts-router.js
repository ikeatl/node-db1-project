const router = require("express").Router();
const Account = require("./accounts-model");
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getById(req.params.id);
    if (!data) {
      res.status(404).json({ message: "account not found" });
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.create(req.body);
    if (data) {
      res.status(201).json(data);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", checkAccountPayload, checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.updateById(req.params.id, req.body);
    console.log("data:", data);
    if (!data) {
      res.status(404).json({ message: "Account not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC

  try {
    const data = await Account.remove(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
