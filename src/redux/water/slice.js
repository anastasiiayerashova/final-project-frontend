import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addWater,
  deleteWater,
  editWater,
  fetchWaterDaily,
  fetchWaterMonth,
} from './operations';

const getMonthFromDate = (dateString) => {
  return dateString.slice(0, 7);
};

const initialState = {
  date: new Date().toISOString(),
  month: getMonthFromDate(new Date().toISOString()),
  isDaySelected: false, // Якщо користувач обрав днь з календаря
  dayWaterList: [],
  monthData: [],
  loading: false,
  error: null,
  waterId: null, // Для видалення або редагування конкретного запису про воду
};

const slice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setWaterId: (state, action) => {
      state.waterId = action.payload;
    },
    clearWaterId: (state) => {
      state.waterId = null;
    },
    updateDate: (state) => {
      const newDate = new Date().toISOString();
      state.date = newDate;
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    setDaySelected: (state, action) => {
      state.isDaySelected = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterDaily.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dayWaterList = action.payload;
      })
      .addCase(addWater.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteWater.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(editWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Змінюємо список води пез запиту на бекенд
        const updatedItem = action.payload;
        const index = state.dayWaterList.findIndex(
          (item) => item._id === updatedItem._id,
        );
        if (index !== -1) {
          state.dayWaterList[index] = updatedItem; // Оновлюємо елемент по індексу
        }
      })
      .addCase(fetchWaterMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.monthData = action.payload;
      })
      // При logoutі користвуача очищаємо всі дані в стейті
      // .addCase(logout.fulfilled, () => {
      // 	return initialState;
      // })

      .addMatcher(
        isAnyOf(
          fetchWaterDaily.pending,
          addWater.pending,
          deleteWater.pending,
          editWater.pending,
        ),
        (state) => {
          state.loading = true;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchWaterDaily.rejected,
          addWater.rejected,
          deleteWater.rejected,
          editWater.rejected,
        ),
        (state, action) => {
          state.error = action.payload;
          state.loading = false;
        },
      );
  },
});

export const {
  setWaterId,
  clearWaterId,
  updateDate,
  setMonth,
  setDaySelected,
  setDate,
} = slice.actions;

export const waterReducer = slice.reducer;
