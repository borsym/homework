import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  search: string;
  showOnlyCaught: boolean;
  selectedTypes: string[];
}

const initialState: FiltersState = {
  search: '',
  showOnlyCaught: false,
  selectedTypes: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setShowOnlyCaught(state, action: PayloadAction<boolean>) {
      state.showOnlyCaught = action.payload;
    },
    setSelectedTypes(state, action: PayloadAction<string[]>) {
      state.selectedTypes = action.payload;
    },
  },
});

export const { setSearch, setShowOnlyCaught, setSelectedTypes } =
  filtersSlice.actions;
export default filtersSlice.reducer;
