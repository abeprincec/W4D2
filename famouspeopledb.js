function findFamousPeople(db, name, callback) {
	const query = `SELECT  * from famous_people
     where first_name ILIKE $1 OR 
      last_name ILIKE $1 ;`;

     return db.query(query, [name])
    }
module.exports = {
	findFamousPeople: findFamousPeople,
	
};
