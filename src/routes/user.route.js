import { Router } from "express";
import { registerUser, loginUser, getProfile, updateProfile } from "../controller/user.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.route('/register').post( upload.fields([
    { name: "avatar", maxCount: 1 },
]),registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(verifyUser,getProfile);
router.route('/update-profile').put(verifyUser,updateProfile);


export default router;