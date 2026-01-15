import { configureStore } from '@reduxjs/toolkit';
import { reactive, computed } from 'vue';
import bookReducer from './bookSlice';

// 配置 Redux Store
export const store = configureStore({
  reducer: {
    book: bookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 创建响应式绑定
// 创建一个持有 Redux 当前状态的 reactive 对象
const state = reactive(store.getState());

// 订阅 store
store.subscribe(() => {
  const newState = store.getState();
  Object.assign(state, newState);
});


export const useAppSelector = <T>(selector: (state: RootState) => T) => {
  return computed(() => selector(state as RootState));
};

export const dispatch = store.dispatch;
