const router = require('express').Router();
const etapeController = require('../controllers/etape.controller');
const {requireAuth} = require('../middleware/auth.middleware');

router.patch('/ajout-etape/:id', requireAuth,etapeController.createEtape);//créer étape
router.patch('/modification-etape/:id', requireAuth,etapeController.editEtape);//modifier étape
router.patch('/suppression-etape/:id', requireAuth,etapeController.deleteEtape);//supprimer étape

module.exports = router;