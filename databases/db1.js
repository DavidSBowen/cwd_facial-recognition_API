const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
        host: 'ec2-23-21-121-220.compute-1.amazonaws.com',
        user: 'qbtdsljwzjyoly',
        password: 'a8df1259ee46b49552e1125536aad758e42c0bee506ed825096c6a8de4c61168',
        database: 'dqehskl5raahd'
    }
});

module.exports = {
    db: db
};