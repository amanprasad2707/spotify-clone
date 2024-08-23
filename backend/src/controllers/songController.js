import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    const { name, desc, album, } = req.body;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: 'video' })
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
    const duration = `${Math.floor(audioUpload.duration / 60)}: ${Math.floor(audioUpload.duration % 60)}`
    const songData = {
      name, desc, album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    }
    const song = songModel(songData);
    const response = await song.save();
    // console.log(`response: ${response}`);
    if (response) {
      res.status(201).send({ success: true, message: 'song added successfully' });
    } else {
      res.send({ success: false, message: 'something went wrong' })
    }
  } catch (error) {
    res.send({ success: 'false', message: "An error occurred while uploading", error })
  }
}
const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({})
    if (allSongs) {
      res.json({ success: true, song: allSongs })
    } else {
      res.json({ success: false, message: 'unable to list songs' })
    }
  } catch (error) {
    res.json({ success: false, error })
  }
}

const removeSong = async (req, res) => {
  try {
    const response = await songModel.findByIdAndDelete(req.body.id);
    if (response) {
      res.json({ success: true, message: `${response.name} song deleted successfully` })
    } else {
      res.json({ success: false, message: 'unable to delete song' })
    }
  } catch (error) {
    res.json({ success: false, error })
  }
}

export {
  addSong,
  listSong,
  removeSong,
}