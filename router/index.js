const Router=require('express').Router;
const authController=require('../auth/auth-controller')
const testController=require('../test/test-controller')
const subtestController=require('../subtest/subtest-controller')
const sendTestController=require('../sent-test/sent-test-controller')
const router=new Router();
const {body}=require('express-validator');
const multer=require('multer');

const storage=multer.memoryStorage();
const upload=multer({storage:storage})

router.post('/registration',body('email').isEmail(),body('password').isLength({min:8}),authController.registration)
router.post('/login',authController.login);
router.post('/logout',authController.logout);
router.get('/refresh', authController.refresh);
router.get('/activate/:link',authController.activate);

router.post('/test/add',testController.addTest);
router.post('/test/delete',testController.deleteTest);
router.post('/test/edit',testController.edit);
router.post('/test/get',testController.get);
router.post('/test/important',testController.markAsImportant);
router.post('/test/title',testController.editTitle)
router.post('/test/getById',testController.getTestById)

router.post('/subtest/add',upload.single('file'),subtestController.add)
router.post('/subtest/get',subtestController.get)
router.post('/subtest/delete',subtestController.delete)
router.post('/subtest/edit',subtestController.edit)

router.post('/test/send',sendTestController.sendSubtest)
router.post('/test/getSent',sendTestController.get);
router.post('/test/sentTest/list',sendTestController.getList)
module.exports=router;