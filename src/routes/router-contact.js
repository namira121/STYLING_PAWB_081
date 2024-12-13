const router = require('express').Router();
const contactController = require('../controllers').contact;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, contactController.getContact);
router.get('/contact/add', verifyUser.isLogin, contactController.formContact);
router.post('/contact/save', verifyUser.isLogin, contactController.saveContact);
router.get('/contact/edit/:id', verifyUser.isLogin, contactController.editContact);
router.post('/contact/update/:id', verifyUser.isLogin, contactController.updateContact);
router.get('/contact/delete/:id', verifyUser.isLogin, contactController.deleteContact);

module.exports = router;