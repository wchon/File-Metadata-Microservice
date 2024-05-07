var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer')
const upload = multer({ dest: 'upload/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  let upfile = req.file;
  if (typeof upfile === "undefined") res.json({ error: "file not uploaded" });
  try {
    res.json({
      name: upfile.originalname,
      type: upfile.mimetype,
      size: upfile.size,
    });
  } catch (err) {
    res.send(400);
  }
  
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
