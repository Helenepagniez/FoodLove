const router = require('express').Router();
const ingredientController = require('../controllers/ingredient.controller');
const {requireAuth} = require('../middleware/auth.middleware');

router.get('/', requireAuth, ingredientController.readIngredient);//lire liste ingrédients
router.get('/:id', requireAuth, ingredientController.getOneIngredient);//lire un ingrédient
router.post('/', requireAuth, ingredientController.createIngredient);//créer ingredient
router.put('/:id', requireAuth, ingredientController.editIngredient);//modifier ingredient
router.delete('/:id', requireAuth, ingredientController.deleteIngredient);//supprimer ingredient

module.exports = router;