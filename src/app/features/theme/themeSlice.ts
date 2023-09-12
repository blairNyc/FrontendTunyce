import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type Themes = {}

const themeSlice = createSlice({
    name: 'usertheme',
    initialState: { userTheme: 'originalTheme' },
    reducers: {
        setUserTheme: (state, action: PayloadAction<string>) => { 
            state.userTheme = action.payload
        },
        resetUserTheme: (state, action: PayloadAction) => { 
            state.userTheme = 'originalTheme';
        }
    }
});

export const { setUserTheme, resetUserTheme } = themeSlice.actions;
export default themeSlice.reducer;
export const selectUserTheme = (state: any) => state.usertheme.userTheme;
export const selectCurrentUserTheme = (state: any) => state.usertheme.userTheme;


