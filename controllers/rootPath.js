const handleRootGET = (req, res, db) => {
    console.log('root access');
    db
        .select('*')
        .from('users')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('not found');
            }
        }).catch(err => {
            res.status(400).json('database error');
        })
}

module.exports = {
    handleRootGET: handleRootGET
};