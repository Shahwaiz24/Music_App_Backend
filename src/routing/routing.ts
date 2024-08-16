import express from 'express';
import UserController from '../controller/controller';

const userRouting = express.Router();

userRouting.post('/signup', UserController.signup);
userRouting.post('/login', UserController.login);




export default userRouting;