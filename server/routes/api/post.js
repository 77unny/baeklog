import express from 'express';
import Post from '../../models/post';

const router = express.Router();

router.get('/', async (req, res) => {
  const postFindResult = await Post.find();
  console.log(postFindResult, '[find post]');
  res.json(postFindResult);
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req, '[post req]');
    const {title, contents, fileUrl, creator} = req.body;
    const newPost = await Post.create({
      title, contents, fileUrl, creator
    });
    res.json(newPost);
  } catch (e) {
    console.log(`[async error] : ${e}`);
  }
});

export default router