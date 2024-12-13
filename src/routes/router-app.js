const router = require('express').Router();
const homeController = require('../controllers').home;
const profileController = require('../controllers').profile;
const verifyUser = require('../configs/verify');
const controllerContact = require('../controllers/controller-contact');

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/contact', verifyUser.isLogin, controllerContact.getContact);
router.get('/profile', verifyUser.isLogin, profileController.profile);
router.get('/contact/add', verifyUser.isLogin, controllerContact.formContact);
router.get('/contact/edit/:id', verifyUser.isLogin, controllerContact.editContact); 
router.post('/contact/update/:id', verifyUser.isLogin, controllerContact.updateContact); 
router.post('/contact/delete/:id', verifyUser.isLogin, controllerContact.deleteContact);
router.post('/contact/save', verifyUser.isLogin, controllerContact.saveContact);



module.exports = router;