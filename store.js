import { configureStore} from "@reduxjs/toolkit";
import ProductReducer from "../Features/ProductSlice"

const store = configureStore({
    reducer:{
        Products: ProductReducer,
    }
});

export default store;