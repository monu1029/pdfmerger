const express = require('express')
const path = require('path')
const {mergePdf} = require('./merge')
const app = express();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

app.use('/static', express.static('public'))
const port = 3003;

app.get('/' , (req, res)=>{
    res.sendFile(path.join(__dirname,"template/index.html"))
})

app.post('/merge', upload.array('Pdfs', 2), async(req, res, next) =>{
    console.log(req.files)
      await mergePdf(path.join(__dirname, req.files[0].path ),path.join(__dirname, req.files[1].path))
    
    res.redirect("http://localhost:3003/static/merged.pdf")
  })

app.listen(port ,()=>{
    console.log("server is running on port " + port)
})