const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'b16a97bcc12f4449b6c84d3461811a8b'
});

const handleClarifaiApiCall = (req, res) => {
    app.models
        .predict(
            Clarifai.FACE_DETECT_MODEL,
            req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).json('image error');
        });
};

const handleImagePathPUT = (req, res, db) => {
    const { id } = req.body;

    db('users')
        .returning('*')
        .where('id', '=', id)
        .increment('entries', 1)
        .then(data => {
            console.log(data);
            return res.status(200).json(data[0]);
        })
        .catch(error => {
            console.log(error);
            return res.status(404).json('unable to update or retrieve entries');
        });
}

module.exports = {
    handleImagePathPUT: handleImagePathPUT,
    handleClarifaiApiCall: handleClarifaiApiCall
};