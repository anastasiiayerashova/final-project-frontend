import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addWater, deleteWater, editWater, fetchWaterDaily, fetchWaterMonthly } from './operations';
import { logoutUserOperation } from '../user/operations';

const getMonthFromDate = (dateString) => {
  return dateString.slice(0, 7);
};

const initialState = {
  date: new Date().toISOString(),
  month: getMonthFromDate(new Date().toISOString()),
  isDaySelected: false, // Якщо користувач обрав день з календаря
  dayWaterList: [],
  monthData: [],
  loading: false,
  loadingDaily: false,
  loadingMonthly: false,
  error: null,
  errorDaily: null,
  errorMonthly: null,
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
      .addCase(fetchWaterDaily.pending, (state) => {
        state.loadingDaily = true;
        state.errorDaily = null;
      })
      .addCase(fetchWaterDaily.fulfilled, (state, action) => {
        state.loadingDaily = false;
        state.errorDaily = null;
        state.dayWaterList = action.payload;
      })
      .addCase(fetchWaterDaily.rejected, (state, action) => {
        state.loadingDaily = false;
        state.errorDaily = action.payload;
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
        // Змінюємо список води без запиту на бекенд
        const updatedItem = action.payload;
        const index = state.dayWaterList.findIndex(
          (item) => item._id === updatedItem._id,
        );
        if (index !== -1) {
          state.dayWaterList[index] = updatedItem; // Оновлюємо елемент по індексу
        }
      })
      .addCase(fetchWaterMonthly.pending, (state) => {
        state.loadingMonthly = true;
        state.errorMonthly = null;
      })
      .addCase(fetchWaterMonthly.fulfilled, (state, action) => {
        state.loadingMonthly = false;
        state.errorMonthly = null;
        state.monthData = action.payload;
      })
      .addCase(fetchWaterMonthly.rejected, (state, action) => {
        state.loadingMonthly = false;
        state.errorMonthly = action.payload;
      })
      // При logoutі користвуача очищаємо всі дані в стейті
      .addCase(logoutUserOperation.fulfilled, () => {
        return initialState;
      })

      .addMatcher(
        isAnyOf(addWater.pending, deleteWater.pending, editWater.pending),
        (state) => {
          state.loading = true;
        },
      )
      .addMatcher(
        isAnyOf(addWater.rejected, deleteWater.rejected, editWater.rejected),
        (state, action) => {
          state.error = action.payload;
          state.loading = false;
        },
      );
  },
});

export const { setWaterId, clearWaterId, updateDate, setMonth, setDaySelected, setDate } = slice.actions;

export const waterReducer = slice.reducer;