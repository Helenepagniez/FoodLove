const router = require('express').Router();
const ingredientController = require('../controllers/ingredient.controller');
const {requireAuth} = require('../middleware/auth.middleware');

router.get('/:id', requireAuth, ingredientController.getOneIngredientById);//lire un ingrédient par son _id
router.get('/nom/:nomIngredient', requireAuth, ingredientController.getOneIngredientByName);//lire un ingrédient par son nom
router.get('/', requireAuth, ingredientController.readIngredient);//lire liste ingrédients
router.post('/', requireAuth, ingredientController.createIngredient);//créer ingredient
router.put('/:id', requireAuth, ingredientController.editIngredient);//modifier ingredient
router.delete('/:id', requireAuth, ingredientController.deleteIngredient);//supprimer ingredient

module.exports = router;