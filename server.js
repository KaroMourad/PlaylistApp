
const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const port = 7000;
let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function downloadImage (file) {  
    const url = file.url;
    const path = Path.resolve(__dirname+"/src/", 'files', file.name)
    const writer = Fs.createWriteStream(path)
  
    const response = await Axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
  
    response.data.pipe(writer)
  
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
};

app.post("/download", (req, res) => {
    if (req.body.files) {
        const files = req.body.files;
        let promArr = [];
        files.forEach(f => {
           let promise = downloadImage({name:f.name, url: f.url})
           promArr.push(promise);
        })
        Promise.all(promArr).then(()=>{
            res.send({message: "ok"})
        }).catch(err => {
            res.send({err: err.message})
        })
    } else throw "error";
});

app.listen(port, _ => console.log(`The server is listening on port ${port}`));
