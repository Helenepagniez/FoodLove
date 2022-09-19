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
router.patch('/modification-ingredient/:id', requireAuth,recetteController.editIngredient);//modifier ingrédient
router.patch('/suppression-ingredient/:id', requireAuth,recetteController.deleteIngredient);//suppprimer ingrédient

router.patch('/ajout-etape/:id', requireAuth,recetteController.createEtape);//créer étape
router.patch('/modification-etape/:id', requireAuth,recetteController.editEtape);//modifier étape

module.exports = router;