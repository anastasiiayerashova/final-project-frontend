import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addWater } from './operations';

const initialState = {
  date: new Date().toISOString(),
  todayWaterList: [],
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
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todayWaterList.push(action.payload);
      })

      // При logoutі користвуача очищаємо всі дані в стейті
      // .addCase(logout.fulfilled, () => {
      // 	return initialState;
      // })

      .addMatcher(
        // isAnyOf - допоміжна функція, яка спрощує створення предикатів для addMatcher. Вона повертає true, якщо дія відповідає будь-якій з переданих дій.
        isAnyOf(
          // fetchWater.pending,
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
          // fetchWater.rejected,
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
