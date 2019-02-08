module.exports = {
	ensureAuthenticated: (req, res, next)=>{
		if(req.isAuthenticated()){
			return next();
		}

		res.status(401).json('Por favor, faça login para acessar este recurso.');
	}
}