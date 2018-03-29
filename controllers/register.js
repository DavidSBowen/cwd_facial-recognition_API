
const handleRegisterPOST = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    bcrypt.hash(password, saltRounds, (hashError, hashSuccess) => {
        db.transaction(trx => {
            trx.insert({
                hash: hashSuccess,
                email: email
            })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            email: loginEmail[0],
                            name: name,
                            joined: new Date()
                        })
                        .then(user => {
                            console.log('POST /register successfully registered for:', user[0].email)
                            res.json(user[0])
                        })
                        .catch(err => {
                            res.status(400).json('failed to register user');
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
            .catch(err => {
                res.status(400).json('unable to register');
            });
    });
}

module.exports = {
    handleRegisterPOST: handleRegisterPOST
};