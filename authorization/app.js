const express = require('express')
const fs = require('fs')
var path = require('path')
const dir = 'public/html/'
const app = express()

const port = process.env.PORT | 3000;
// app.set('views',path.join(__dirname,'views'))
app.use( express.static(path.join(__dirname,'public')));
// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get('/',(req, res) => {
	render(res,'login.html');

}).listen(port,()=>{console.log(`${port}`)})

const render = (res,file) => {
	fs.readFile(dir+file,(err,data)=>{
		if(err){
			res.writeHead(404, {'Content-Type':'text/html'});
			res.end('<h1>404 file not found</h1>');
		}
		res.writeHead(200, {'Content-Type':'text/html'});
		return res.end(data)
	})
}