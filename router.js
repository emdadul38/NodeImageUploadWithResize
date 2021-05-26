const express = require('express');
const app = express();
const path = require('path');

const router = express.Router();
const upload = require('./uploadMiddleware');
const Resize = require('./Resize');

router.get('/', async function (req, res) {
  await res.render('index');
});

router.post('/post', upload.any(), async function (req, res) {
  console.log(req.files)
  const imagePath = path.join(__dirname, '/public/images');
  const fileUpload = new Resize(imagePath);
  if (!req.files) {
    res.status(401).json({error: 'Please provide an image'});
  }
  for(let file of req.files) {
    await fileUpload.save(file.buffer);
  }
  return res.status(200).json({message:  `File upload `});
});

module.exports = router;