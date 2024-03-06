
import { produce } from 'immer'

const productState = {

    recipe: [
        {id:1, name:'cake',instruction:'mix flour and suger',idUser:1,idCategory:1,idLevel:10,description: 'delicious'},
        {id:2, name:'bread',instruction:'mix flour and water',idUser:1,idCategory:2,idLevel:20,description: 'delicious'},
        {id:3, name:'cookies',instruction:'mix flour and suger and chooclate',idUser:3,idCategory:3,idLevel:20,description: 'very tasty!'},
        {id:4, name:'ice cream',instruction:'mix cream and suger',idUser:3,idCategory:4,idLevel:30,description: 'very easy!'},
        {id:5, name:'ice coffee',instruction:'mix milk and coffee',idUser:2,idCategory:4,idLevel:10,description: 'perfect!' },
        {id:6, name:'chooclate-cake',instruction:'mix flour and caco',idUser:3,idCategory:2,idLevel:20,description: 'perfect!' }

    ],

    category:[
      {id:1,name:'cakes'},
      {id:2,name:'milk'},
      {id:3,name:'meat'},
      {id:4,name:'breads'}
    ],

    level:[
        {id:10,name:'hard'},
        {id:20,name:'easy'},
        {id:30,name:'medium'}
      ],

    ingredients:[
        {id:100,name:'flour'},
        {id:101,name:'sugar'},
        {id:102,name:'milk'},
        {id:103,name:'caco'}
    ],

    ingredientsToRecipes:[
        {id:1,idRecipe:2,idIngredients:102,qty:'2 cup'},
        {id:2,idRecipe:1,idIngredients:100,qty:'3 spoon'},
        {id:3,idRecipe:3,idIngredients:100,qty:'4 teaspoon'},
        {id:4,idRecipe:4,idIngredients:103,qty:'2 cup'},
        {id:5,idRecipe:5,idIngredients:102,qty:'1.5 cup'},
        {id:6,idRecipe:5,idIngredients:103,qty:'2.5 cup'},
        {id:7,idRecipe:2,idIngredients:100,qty:'4 spoon'},
        {id:8,idRecipe:2,idIngredients:101,qty:'2 cup'}
    ],

    commentsToRecipes:[
        {id:11,idUser:3,idRecipe:5,reply:"אהבתי את המתכון, היה ממש טעים"},
        {id:12,idUser:1,idRecipe:4,reply:"🤤🌭🍟מושלם וקל במיוחד"},
        {id:13,idUser:1,idRecipe:3,reply:"🥐🥨טעים וקליל לסתם יום"},
        {id:14,idUser:2,idRecipe:3,reply:"🍰☕יוקרתי מאד"},
        {id:15,idUser:2,idRecipe:2,reply:"🥗🥪נראה מרשים וגם טעים"},
    ],
    listToSearch:[
        {name:'AllRecipe'},
        {name:'add recipe'},
        {name:'add ingredient'},
        {name:'login'},
        {name:'register'}
    ]
}

const recipeReducer = produce((state, action) => {
    switch (action.type) {
        case 'ADD_RECIPE':
            state.recipe = [...state.recipe, action.payload]
            break;
        case 'ADD_REPLY':
            state.commentsToRecipes = [...state.commentsToRecipes, action.payload]
            break;
        case 'ADD_LEVEL':
            state.level = [...state.level,action.payload]
            break;
        case 'ADD_CATEGORY':
            state.category = [...state.category,action.payload]
            break;
        case 'ADD_INGREDIENT':
            state.ingredients = [...state.ingredients,action.payload]
            break;
        case 'ADD_INGREDIENT_TO_RECIPE':
            state.ingredientsToRecipes = [...state.ingredientsToRecipes,action.payload]
            break;
        default:
            break;
    }

}, productState)

export default recipeReducer;