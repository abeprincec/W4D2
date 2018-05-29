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

const input = process.argv[2];

//console.log(knex);
knex('famous_people')
	.where({ first_name: input })
	.orWhere({ last_name: input })
	.asCallback(function(err, rows) {
		if (err) {
			return console.error(err);
		}
		//console.log(rows);
		console.log(`Found ${rows.length} person(s) by the name '${input}'`);

		rows.forEach((element, index) => {
			console.log(`${element.first_name}, ${element.last_name}`);
		});
		process.exit();
	});
