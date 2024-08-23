import { v2 as cloudinary } from 'cloudinary';
import albumModel from '../models/albumModel.js';

const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgColor } = req.body;
    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })

    const albumData = {
      name, desc, bgColor,
      image: imageUpload.secure_url
    }
    const album = albumModel(albumData);
    const response = await album.save();
    if (response) {
      res.status(201).send({ success: true, message: 'Album added successfully' });
    } else {
      res.send({ success: false, message: 'something went wrong' })
    }
  } catch (error) {
    res.json({ success: false, error })
  }
}
const listAlbum = async (req, res) => {
  try {
    const allAlbums = await albumModel.find({});
    if (allAlbums) {
      res.json({ success: true, albums: allAlbums })
    } else {
      res.send({ success: false, message: 'something went wrong' })
    }
  } catch (error) {
    res.json({ success: false, error })
  }
}
const removeAlbum = async (req, res) => {
  console.log(`data: ${req.body.id}`);
  try {
    const response = await albumModel.findByIdAndDelete(req.body.id)
    if (response) {
      res.json({ success: true, message: `${response.name} album removed successfully` })
    } else {
      res.send({ success: false, message: 'something went wrong' })
    }
  } catch (error) {
    res.json({ success: false, error })
  }
}

export { addAlbum, listAlbum, removeAlbum }