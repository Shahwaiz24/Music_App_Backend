import express from 'express';
import UserController from '../controller/controller';

const userRouting = express.Router();

userRouting.post('/signup', UserController.signup);
userRouting.post('/login', UserController.login);
userRouting.get('/getArtist', UserController.getArtist);
userRouting.post('/createArtist', UserController.createArtist);
userRouting.get('/getToken', UserController.getToken);
userRouting.post('/updateToken', UserController.updateToken);







export default userRouting;