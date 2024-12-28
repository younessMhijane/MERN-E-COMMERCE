import express from 'express';
import { createUser,loginUser,logoutUser,
    getAllUsers,getUserProfil,updateUserProfil,
    deleteUserById,getUserById } from '../controllers/userController.js';
import { authenticate,authorizedAdmin } from '../middlewares/authMiddleware.js';

const router =express.Router();

router.route('/').post(createUser).get(authenticate,authorizedAdmin,getAllUsers);
router.post('/auth',loginUser);
router.post('/logout',logoutUser);
router.route('/profil').get(authenticate,getUserProfil).put(authenticate,updateUserProfil);
router.route('/:id')
    .delete(authenticate,authorizedAdmin, deleteUserById)
    .get(authenticate,authorizedAdmin,getUserById)
    .put(authenticate,authorizedAdmin)


export default router;