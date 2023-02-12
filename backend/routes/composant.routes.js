const router = require('express').Router();
const composantController = require('../controllers/composant.controller');
const {requireAuth} = require('../middleware/auth.middleware');

router.patch('/ajout-composant/:id', requireAuth,composantController.createComposant);//créer composant
router.patch('/modification-composant/:id', requireAuth,composantController.editComposant);//modifier composant
router.patch('/suppression-composant/:id', requireAuth,composantController.deleteComposant);//suppprimer composant

module.exports = router;