
export const addRecipe = (recipe) => {
    return { type: 'ADD_RECIPE', payload: recipe }
}

export const addReply = (replyId) => {
    return { type: 'ADD_REPLY', payload: replyId }
}

export const addLevel = (level) => {
    return { type: 'ADD_LEVEL', payload: level }
}

export const addCategory = (category) => {
    return { type: 'ADD_CATEGORY', payload: category }
}

export const addIngredient = (ingredient) => {
    return { type: 'ADD_INGREDIENT', payload: ingredient }
}

export const addIngredientToRecipe = (ingredientTo) => {
    return { type: 'ADD_INGREDIENT_TO_RECIPE', payload: ingredientTo }
}