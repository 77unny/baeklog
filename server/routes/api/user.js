import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../../config';
import User from '../../models/user';

const router = express.Router();

/**
 * @description getUser api
 * @throws user가 없으면 return
 * @access public
 * */
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No Users');
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      mag: e.message
    });
  }
});

/**
 * @description postUser api
 * @access public
 * */
router.post('/', (req, res) => {
  console.log(req);
  const {name, email, password} = req.body;

  if (!name || !email || !password) return res.status(400).json({msg: '모든 필드를 채워주세요'});

  User.findOne({email}).then(user => {
    if (user) return res.status(400).json({msg: '이미 가입된 유저가 존재합니다'});
    const newUser = new User({name, email, password});

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            {id: user.id},
            JWT_SECRET,
            {expiresIn: 3600},
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id   : user.id,
                  name : user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

export default router;