import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addWater, fetchWaterDaily } from './operations';

const initialState = {
  date: new Date().toISOString(),
  dayWaterList: [],
  monthData: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'water',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterDaily.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dayWaterList = action.payload;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })

      // При logoutі користвуача очищаємо всі дані в стейті
      // .addCase(logout.fulfilled, () => {
      // 	return initialState;
      // })

      .addMatcher(
        // isAnyOf - допоміжна функція, яка спрощує створення предикатів для addMatcher. Вона повертає true, якщо дія відповідає будь-якій з переданих дій.
        isAnyOf(
          fetchWaterDaily.pending,
          addWater.pending,
          // deleteWater.pending,
          // editWater.pending,
        ),
        (state) => {
          state.loading = true;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchWaterDaily.rejected,
          addWater.rejected,
          // deleteWater.rejected,
          // editWater.rejected,
        ),
        (state, action) => {
          state.error = action.payload;
          state.loading = false;
        },
      );
  },
});

export const waterReducer = slice.reducer;
