import mongoose from 'mongoose';
import moment from 'moment';

const UserSchema = new mongoose.Schema({
  name        : {
    type    : String,
    required: true
  },
  email       : {
    type    : String,
    required: true,
    unique  : true
  },
  password    : {
    type    : String,
    required: true
  },
  role        : {
    type   : String,
    enum   : ['admin', 'manager', 'user'],
    default: 'user'
  },
  registerDate: {
    type   : Date,
    default: moment().format('YYYY-MM-DD hh:mm:ss')
  },
  comments    : [
    {
      postId   : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'post'
      },
      commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'comment'
      }
    }
  ],
  posts       : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'post'
    }
  ]
});

const User = mongoose.model('user', UserSchema);

export default User;