const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('../middleware/multer-config');
const {requireAuth} = require('../middleware/auth.middleware');

router.get('/', requireAuth, postController.readPost);//lire post
router.post('/', requireAuth, multer, postController.createPost);//écrire post
router.put('/:id', requireAuth,multer, postController.updatePost);//modifier post
router.delete('/:id', requireAuth, postController.deletePost);//supprimer post


module.exports = router;