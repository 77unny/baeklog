import express from 'express';
import Post from '../../models/post';
import User from '../../models/user';
import Category from '../../models/category';
import auth from '../../middleware/auth';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import moment from 'moment'
import { isNullOrUndefined } from "util";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId    : process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: 'baeklog/upload',
    region: 'ap-northeast-2',
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    }
  }),
  limits : {fileSize: 100 * 1024 * 1024}
});

const router = express.Router();

router.get('/', async (req, res) => {
  const postFindResult = await Post.find();
  console.log(postFindResult, '[find post]');
  res.json(postFindResult);
});

router.post('/', auth, async (req, res, next) => {
  try {
    console.log(`[post req] : ${req}`);
    const {title, contents, fileUrl, creator} = req.body;
    const newPost = await Post.create({title, contents, fileUrl, creator});
    console.log(`[await res] : ${newPost}`);
    res.json(newPost);
  } catch (e) {
    console.log(`[async error] : ${e}`);
  }
});

router.post('/image', uploadS3.array('upload', 5), async (req, res, next) => {
  try {
    console.log(req.files.map(v => v.location));
    res.json({uploaded: true, url: req.files.map(v => v.location)});
  } catch (e) {
    console.error(e);
    res.json({uploaded: false, url: null});
  }
});

router.post('/', uploadS3.none(), async (req, res, next) => {
  try {
    const {title, category, contents, fileUrl, creator} = req.body;
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator,
      date: moment().format('YYYY-MM-DD hh:mm:ss')
    });

    const findResult = await Category.findOne({
      categoryName: category
    });

    if (isNullOrUndefined(findResult)) {
      const newCategory = await Category.create({
        categoryName: category
      });
      await Post.findByIdAndUpdate(newPost._id, {
        $push: {category: newCategory._id}
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: {posts: newPost._id}
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: {posts: newPost._id}
      });
    } else {
      // 이미 존재하는 경우
      await Category.findByIdAndUpdate(findResult._id, {
        $push: {posts: newPost._id}
      });
      await Post.findByIdAndUpdate(newPost._id, {
        // 배열이 아닌 경우 $push 제외
        category: findResult._id
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: {posts: newPost._id}
      });
    }

    // 작성 완료 후 리다이렉트
    return res.redirect(`/api/post/${newPost._id}`);

  } catch (e) {
    console.error(e);
  }
});

export default router;