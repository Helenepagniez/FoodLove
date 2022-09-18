const router = require('express').Router();
const recetteController = require('../controllers/recette.controller');
const multer = require('../middleware/multer-config');
const {requireAuth} = require('../middleware/auth.middleware');

router.get('/', requireAuth, recetteController.readRecette);//lire liste recettes
router.get('/:id', requireAuth, recetteController.getOneRecette);//lire une recette
router.post('/', requireAuth, multer, recetteController.createRecette);//écrire recette
router.put('/:id', requireAuth,multer, recetteController.updateRecette);//modifier recette
router.delete('/:id', requireAuth, recetteController.deleteRecette);//supprimer recette

router.patch('/ajout-ingredient/:id', requireAuth,recetteController.createIngredient);//créer ingrédient


router.patch('/ajout-etape/:id', requireAuth,recetteController.createEtape);//créer étape

module.exports = router;