const router = require("express").Router();

// Import controllers
const UserController = require("../controllers/UserController");
const QuestionController = require("../controllers/QuestionController");
const ClientController = require("../controllers/ClientController");
const RewardController = require("../controllers/RewardsController");
const { imageUpload } = require('../helpers/image-upload')

//Login
router.post("/create", UserController.create);
router.post("/login", UserController.login);

router.post('/question',imageUpload.single('image'), QuestionController.questionCreate);
router.get('/getQuestion', QuestionController.getQuestions);
router.put('/updateQuestion/:id', QuestionController.updateQuestion)
router.delete('/removeQuestion/:id', QuestionController.removeQuestion)

router.post('/cadClient', ClientController.registerClient)
router.get("/list", ClientController.getClient);

router.post('/rewardCreate',imageUpload.single("image"), RewardController.rewardRegister)
router.get('/reward', RewardController.getReward)
router.get('/reward/:id', RewardController.getRewardById)
router.put('/rewardUpdate/:id', RewardController.rewardUpdate)
router.delete('/removeReward/:id', RewardController.removeReward)

router.get('/cpf', ClientController.getCPF)
router.post('/cpf', ClientController.postCpf)

module.exports = router;
