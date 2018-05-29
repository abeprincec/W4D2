const settings = require('./settings');

const knex = require('knex')({
	client: 'pg',
	connection: {
		user: settings.user,
		database: settings.database,
		port: settings.port,
		host: settings.localhost,
		password: settings.password,
	},
	debug: false,
});

const first_name = process.argv[2];
const last_name = process.argv[3];
const date = new Date(process.argv[4]).toISOString();

//console.log(first_name, last_name, date);

//console.log(date)

knex('famous_people')
	.insert({ first_name: first_name, last_name: last_name, birthdate: date })
	.asCallback(function(err, rows) {
		if (err) {
			return console.error(err);
		}
		console.log(
			`Added '${first_name} ${last_name}', born on ${
				date
			}, to the database.`
		);
		process.exit();
	});
