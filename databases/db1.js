const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'davidbowen',
        password: '',
        database: 'smart-brain'
    }
});

module.exports = {
    db: db
};