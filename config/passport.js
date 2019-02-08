const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../model/User');

module.exports = (passport) => {
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
			User.findOne({ where: { email: email } })
				.then(user => {
					if (!user) {
						return done(null, false, { message: 'Este e-mail não está registrado.' });
					}

					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err;

						if (isMatch) {
							return done(null, user);
						} else {
							return done(null, false, { message: 'Senha incorreta!' });
						}

					});
				}).catch(err => console.log(err));
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id_user);
	});

	passport.deserializeUser((id, done) => {
		User.findOne({ where: { id_user: id } })
			.then(usr => {
				done(null, usr);
			}).catch(err => {
				console.log(err);
				done(err, null);
			});
	});
}