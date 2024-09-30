const db = require("../../data/db-config");
exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  if (!req.body.name || req.body.budget === undefined) {
    next({ status: 400, message: "name and budget are required" });
  } else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100" });
  } else if (isNaN(Number(req.body.budget)) || req.body.budget === null || req.body.budget === "") {
    next({ status: 400, message: "budget of account must be a number" });
  } else if (Number(req.body.budget) < 0 || Number(req.body.budget) > 1000000) {
    next({ status: 400, message: "budget of account is too large or too small" });
  } else {
    req.body.name = req.body.name.trim();
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const trimmedName = req.body.name.trim();
  const account = await db("accounts").where("name", trimmedName).first();
  if (account) {
    next({ status: 400, message: "that name is taken" });
  } else {
    next();
  }
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const account = await db("accounts").where("id", req.params.id).first();
  if (!account) {
    next({ status: 404, message: "account not found" });
  } else {
    next();
  }
};
