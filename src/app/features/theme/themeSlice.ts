import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type Theme={
    usertheme:{
        userTheme: string
    }
}
const INITIAL_STATE: Theme={
    usertheme:{
        userTheme: 'originalTheme'
    }
}
const themeSlice = createSlice({
    name: 'usertheme',
    initialState: INITIAL_STATE,
    reducers: {
        setUserTheme: (state, action: PayloadAction<string>) => { 
            state.usertheme.userTheme = action.payload
        },
        resetUserTheme: (state) => { 
            state.usertheme.userTheme = 'originalTheme';
        }
    }
});

export const { setUserTheme, resetUserTheme } = themeSlice.actions;
export default themeSlice.reducer;
export const selectUserTheme = (state: Theme) => state.usertheme.userTheme;
export const selectCurrentUserTheme = (state: Theme) => state.usertheme.userTheme;


