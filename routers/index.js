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

router.post('/question', QuestionController.questionCreate);
router.get('/getQuestion',imageUpload.single('image'), QuestionController.getQuestions);
router.put('/updateQuestion/:id', QuestionController.updateQuestion)
router.delete('/removeQuestion/:id', QuestionController.removeQuestion)

router.post('/cadClient', ClientController.registerClient)
router.get("/list", ClientController.getClient);

router.post('/rewardCreate', RewardController.rewardRegister)
router.get('/reward', RewardController.getReward)


module.exports = router;
