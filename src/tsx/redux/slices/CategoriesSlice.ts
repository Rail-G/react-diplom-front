import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
  currentCategoryId: 0,
};

const categorieSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    searchCategories: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchCategoriesSuccess: (state, action: PayloadAction<Categorie[]>) => {
      state.loading = false;
      state.error = null;
      state.categories = action.payload;
    },
    searchCategoriesError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.categories = [];
    },
    changeCategory: (state, action: PayloadAction<number>) => {
      state.currentCategoryId = action.payload;
    },
  },
});

export const {
  searchCategories,
  searchCategoriesSuccess,
  searchCategoriesError,
  changeCategory,
} = categorieSlice.actions;
export type categoriesAction = ReturnType<
  (typeof categorieSlice.actions)[keyof typeof categorieSlice.actions]
>;
export default categorieSlice.reducer;
