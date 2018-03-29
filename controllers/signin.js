const handleSigninPOST = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).response('incorrect form submission');
    }
    console.log('POST /signin attempted sign in to: ' + email)
    db
        .select('email', 'hash')
        .from('login')
        .where({
            email: email
        })
        .then(data => {
            bcrypt.compare(password, data[0].hash, function (err, resp) {
                if (resp) {
                    db.select('*')
                        .from('users')
                        .where({
                            email: data[0].email
                        })
                        .then(data2 => {
                            console.log('POST /signin successful for:', data2[0].email);
                            res.status(200).json(data2[0]);
                        })
                        .catch(error => {
                            console.log('POST /signin error selecting email from users db', error);
                            res.status(400).json('username / password combo not found')
                        })
                } else {
                    console.log('POST /signin Password problem:' + err + ' ' + data[0].email);
                    res.status(400).json('username / password combo not found');
                }
            });

        })
        .catch(err => {
            console.log('POST /signin error finding email in login db', err);
            res.status(400).json('unable to find user');
        })
}

module.exports = {
    handleSigninPOST: handleSigninPOST
};