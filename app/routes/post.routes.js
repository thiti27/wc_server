const express = require('express');

module.exports = () => {
    const postController = require('../controllers/post.controller');
    const router = express.Router();

    router.route('/job/:id').get(postController.findJobId);
    router.route('/:id').get(postController.findId);
    router.route('/').get(postController.find);
    router.route('/job').post(postController.findJob);
    router.route('/setting').post(postController.findSetting);
    router.route('/updateContent').put(postController.updateContent);
    router.route('/').post(postController.add);
    router.route('/deleteContent/:id').delete(postController.deleteContent);
    router.route('/getDate/:id').get(postController.getByDate);
    router.route('/keyword/:keyword').get(postController.getkeyword);
    router.route('/keyword/job/:keyword').get(postController.getkeywordJob);
    router.route('/updateAuto').put(postController.updateAuto);
    router.route('/getMain').post(postController.getMain);
    router.route('/getType/:id').get(postController.getType);
    router.route('/updateType').put(postController.updateType);
    router.route('/keyword/:keyword/:type').get(postController.getkeywordType);
    router.route('/getDate/:keyword/:type').get(postController.getByDateType);

    router.route('/recent').post(postController.getRecent);
    router.route('/month').post(postController.getMonth);
    router.route('/start').post(postController.getStart);
    router.route('/end').post(postController.getEnd);
    router.route('/year').post(postController.getYear);


    router.route('/year/:y').post(postController.getPostYear);

    router.route('/last').post(postController.getLast);
    router.route('/csr').post(postController.getCsr);
    router.route('/news').post(postController.getNews);
    router.route('/events').post(postController.getEvents);


 
    router.route('/typeContent/:id').get(postController.getType); 

    
    return router;
};
