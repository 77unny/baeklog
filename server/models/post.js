import mongoose from 'mongoose';
import moment from 'moment';

const PostSchema = new mongoose.Schema({
  title   : {
    type    : String,
    required: true,
    index   : true
  },
  contents: {
    type    : String,
    required: true
  },
  views   : {
    type   : Number,
    default: -2
  },
  fileUrl : {
    type   : String,
    default: 'https://via.placeholder.com/300?text=baeklog'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'category'
  },
  date    : {
    type   : String,
    default: moment().format('YYYY-MM-DD hh:mm:ss')
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'comment'
    }
  ],
  creator : {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'user'
  }
});

const Post = mongoose.model('post', PostSchema);

export default Post;