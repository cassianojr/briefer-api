const app = require('./config/custom-express')();
const http = require('http').Server(app);
const cluster = require('cluster');

const numWorkers = process.env.WEB_CONCURRENCY || 1;
if(cluster.isMaster){
	for(let i = 0; i<numWorkers; i++){
		cluster.fork();
	}

	cluster.on('listening', (worker)=>{
		console.log(`[!] Cluster PID: ${worker.process.pid} connected.`);
	});

	cluster.on('exit', ()=>{
		cluster.fork();
	});
}else{
	const PORT = process.env.PORT || 5000;
	
	http.listen(PORT, console.log(`[!] Server started on port ${PORT}`));

}