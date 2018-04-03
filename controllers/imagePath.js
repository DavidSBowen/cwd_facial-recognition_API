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

const handleImagePOST = (req, res, db) => {
    const { email, image_url, number_of_faces } = req.body;

    db('imageposts')
        .returning('*')
        .insert({
            email: email,
            image_url: image_url,
            number_of_faces: number_of_faces
        })
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(error => {
            return res.status(400).json('problem sending image');
        });
};

const handleImageGET = (req, res, db) => {
    const { email } = req.params;

    db('imageposts')
        .select('image_url', 'number_of_faces')
        .where('email', '=', email)
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(error => {
            return res.status(404).json('unable to retrieve images');
        })
};

const handleImagePathPUT = (req, res, db) => {
    const { id } = req.body;

    db('users')
        .returning('*')
        .where('id', '=', id)
        .increment('entries', 1)
        .then(data => {
            return res.status(200).json(data[0]);
        })
        .catch(error => {
            return res.status(404).json('unable to update or retrieve entries');
        });
};

module.exports = {
    handleImagePathPUT: handleImagePathPUT,
    handleClarifaiApiCall: handleClarifaiApiCall,
    handleImageGET: handleImageGET,
    handleImagePOST: handleImagePOST
};