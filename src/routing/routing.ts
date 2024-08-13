import express from 'express';
import { ObjectId } from 'mongodb';
import UserController from '../controller/controller';

const userRouting = express.Router();

userRouting.post('/signup', UserController.signup);



export default userRouting;