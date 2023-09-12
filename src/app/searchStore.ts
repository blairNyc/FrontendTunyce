import { createStore } from 'redux';

interface AppState {
  searchVideoText: string;
}

const initialState: AppState = {
  searchVideoText: '',
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return { ...state, searchVideoText: action.payload };
    default:
      return state;
  }
};

// Create the Redux store
const videoStore = createStore(rootReducer);

// Export RootState type
export type RootState = ReturnType<typeof rootReducer>;

export default videoStore;