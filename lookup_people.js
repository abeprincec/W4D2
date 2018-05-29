const pg = require('pg');
const peopledb = require('./famouspeopledb');
const settings = require('./settings'); // settings.json

const config = {
	user: settings.user,
	password: settings.password,
	database: settings.database,
	host: settings.hostname,
	port: settings.port,
	ssl: settings.ssl,
};

const db = new pg.Client(config);

db.connect((err, connection) => {
	if (err) {
		console.error('Connection error:', err); // Deal with error politely
		process.exit(1);
	}

	peopledb
		.findFamousPeople(db, process.argv[2])
		.then(result => {
			console.log(
				` Found ${result.rowCount} person(s) by the name '${process.argv[2]}'`
			);
			result.rows.forEach((element, index) => {
				formatDate = new Date(element.birthdate);
				const dateOptions = {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				};
				console.log(
					` - ${index + 1}  ${element.first_name} ${
						element.last_name
					}, born '${formatDate.toLocaleDateString('ar-EG', dateOptions)}'`
				);
			});
		})
		.then(() => {
			db.end();
		})
		.catch(error => {
			console.error('AAAAARGH!!!!', error);
			db.end();
		});
});
