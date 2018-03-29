const handleProfile_IdGET = (req, res, db) => {
    const { id } = req.params;
    let found = false;

    db
        .select('*')
        .from('users')
        .where({
            id: id
        })
        .then(data => {
            console.log(data[0].email, data[0].entries);
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(404).json('not found', error);
        })
}

module.exports = {
    handleProfile_IdGET: handleProfile_IdGET
};