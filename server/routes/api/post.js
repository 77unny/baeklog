import express from 'express';
import Post from '../../models/post';
import auth from '../../middleware/auth';

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

export default router;