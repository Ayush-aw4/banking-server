const express = require('express');
const {userRegisterController} = require("../controllers/auth.controller.js")

const router = express.Router();

router.post("/register",userRegisterController)


module.exports = router