const express = require('express');
const ValidTokenController = require('../controllers/ValidTokenController');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.post('/registerUser', UserController.insertUserControll);
router.post('/login', UserController.login); 

router.put('/updateUser', ValidTokenController.validToken, UserController.updateUser);
router.delete('/deleteUser', ValidTokenController.validToken, UserController.deleteUser);


module.exports = router;