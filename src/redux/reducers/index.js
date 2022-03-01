import {combineReducers} from "redux";
import changeCategoryReducer from "./changeCategoryReducer";
import listCategoriesReducer from "./listCategoriesReducer";
import listProductsReducer from "./listProductsReducer";
import cartReducer from "./cartReducer";

const rootReducer=combineReducers({
    changeCategoryReducer,
    listCategoriesReducer,
    listProductsReducer,
    cartReducer
})

export default rootReducer;