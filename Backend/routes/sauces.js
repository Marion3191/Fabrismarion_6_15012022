const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesRoutes = require('../controllers/sauces');//stuffctrl
const like = require('../controllers/like');

router.get('/', auth, saucesRoutes.getAllSauces);
router.post('/', auth, multer, saucesRoutes.createSauces);
router.get('/:id', auth, saucesRoutes.getOneSauces);
router.put('/:id', auth, multer, saucesRoutes.modifySauces);
router.delete('/:id', auth, saucesRoutes.deleteSauces);
router.post('/:id/like', auth, like.likeSauces);

module.exports = router;