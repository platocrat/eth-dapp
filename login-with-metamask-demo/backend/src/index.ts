import './db';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { services } from './services';


const multer = require('multer')
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Mount REST on /api
app.use('/api', services);

const port = process.env.PORT || 8000;

app.listen(port, () =>
	console.log(`Express app listening on localhost:${port}`)
);

var storage = multer.diskStorage({
	destination: function (req: any, file: any, cb: any) {
	cb(null, 'public')
  },
  filename: function (req: any, file: any, cb: any) {
	cb(null, file.originalname)
  }
})

var upload = multer({storage: storage}).single('file')

app.post('/upload',function(req: any, res) {
    upload(req, res, function (err: any) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)
    })
});

__dirname = 'D:\\git\\login-with-metamask-demo\\packages\\backend\\public\\'
app.use(express.static('public'))


app.get('/download/:id', (req, res) => {
	const { id } = req.params;
	res.sendFile(__dirname + id + '.png'); 
});