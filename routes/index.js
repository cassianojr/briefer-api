const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
	res.send('Hello World!');
});

module.exports = (app)=>{
	app.use('/', router);
}
