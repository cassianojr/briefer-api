const passport = require('passport');
const passportJWT = require('passport-jwt');
const cfg = require('./jwt-config');
const ExtratJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
	secretOrKey: cfg.jwtSecret,
	jwtFromRequest: ExtratJWT.fromAuthHeaderAsBearerToken()
}

const User = require('../model/User');

module.exports = ()=>{
	var strategy = new Strategy(params, (payload, done)=>{
		
		User.findByPk(payload.id)
		.then(usr=>{
			if(usr){
				return done(null, {id: usr.id_user});
			}else{
				return done(new Error("User not found"), null);
			}
		}).catch(err=> console.log(err));
	});

	passport.use(strategy);

	return{
		initialize: ()=>{
			return passport.initialize();
		},
		authenticate: ()=>{
			return passport.authenticate("jwt", cfg.jwtSession);
		}
	};
};