const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');
const multer  = require('multer')
const upload = multer(); // <- handles multipart/formdata requests(photos)
// /*---------- Public Routes ----------*/
router.post('/', upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index)

router.delete("/:id", postsCtrl.deletePost);
router.post("/:id/:title/:caption", postsCtrl.editPost);
router.get("/:username/:id", postsCtrl.getPost);



/*---------- Protected Routes ----------*/

module.exports = router;
