import { PayloadAction, createSlice,} from "@reduxjs/toolkit";
type UserTypes = {
    "is_normaluser"?:true, 
    "is_restaunt"?:true,
    "is_superuser"?:true,
    "is_matatu"? : true,
    "is_filmmaker"? : true,
    "is_contentcreator"? : true,
    "is_recordlabel"? : true,
}
type Credentials ={
    auth: {
            [key in keyof UserTypes]: true;
        } & {
        refresh: string | null;
        access: string | null;
        username: string;
        id: string | null;
        [key: string]: string | null | boolean;
    }
};
const INITIAL_STATE: Credentials={
    auth:{
        refresh:'',
        access:'',
        username:'',
        id: '',
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        setCredentials: (state, action:PayloadAction<Credentials>) => {
            const { refresh, access, username, id } = action.payload.auth
            if (action.payload.auth.is_normaluser) {
                state.auth.is_normaluser = true;
            }
            if (action.payload.auth.is_restaunt) {
                state.auth.is_restaunt = true;
            }
            if (action.payload.auth.is_superuser) {
                state.auth.is_superuser = true;
            }
            if (action.payload.auth.is_matatu) {
                state.auth.is_matatu = true;
            }
            if (action.payload.auth.is_filmmaker) {
                state.auth.is_filmmaker = true;
            }
            if (action.payload.auth.is_contentcreator) {
                state.auth.is_contentcreator = true;
            }
            if (action.payload.auth.is_recordlabel) {
                state.auth.is_recordlabel = true;
            }
            state.auth.refresh = refresh;
            state.auth.access = access;
            state.auth.username = username;
            state.auth.id = id;
        },
        logOut: (state) => { 
            state.auth.access = null;
            state.auth.refresh = null;
            state.auth.username = '';
            state.auth.id = null;
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer
export const selectCurrentRefresh = (state: Credentials) => state.auth.refresh
export const selectCurrentAccess = (state: Credentials) => state.auth.access