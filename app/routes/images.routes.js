const express = require('express');

module.exports = () => {
    const imageController = require('../controllers/images.controller');
    const router = express.Router();
  
    router.route('/all/:id').get(imageController.findIdAll);
    router.route('/header/:id').get(imageController.findIdHeader);
    router.route('/:id').delete(imageController.delete);
    router.route('/img').post(imageController.postImg );
    router.route('/db').post(imageController.postDb);


      
    return router;
};
