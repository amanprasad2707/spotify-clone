import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  name:{
    type: 'string',
    required: true
  },
  desc:{
    type: 'string',
    required: true
  },
  album:{
    type: 'string',
    required: true
  },
  image:{
    type: 'string',
    required: true
  },
  file:{
    type: 'string',
    required: true
  },
  duration:{
    type: 'string',
    required: true
  },
})

const songModel = mongoose.models.song || mongoose.model('song',songSchema);

export default songModel;