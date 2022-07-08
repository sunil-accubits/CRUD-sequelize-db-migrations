const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get("/users", userController.getAllUsers);

router.get("/users/:id", userController.getUsersById);

router.post("/create-users", userController.createUsers);

router.put("/edit-users/:id", userController.updateUsers);

router.patch("/edit-users/:id", userController.updateUsers);

router.delete("/delete-users/:id", userController.deleteUsers);

module.exports = router;