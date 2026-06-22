const express = require('express');
const {userRegisterController,userLogin} = require("../controllers/auth.controller.js")

const router = express.Router();

router.post("/register",userRegisterController)

router.post("/login",userLogin)
module.exports = router