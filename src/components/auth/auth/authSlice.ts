import { PayloadAction, createSlice,} from "@reduxjs/toolkit";
import { UserTypes } from "../../../types";
interface Credentials {
    auth: {
            [key in keyof UserTypes]: true;
        } & {
        refresh: string | null;
        access: string | null;
        username: string;
        [key: string]: string | null | boolean;
        curr_loggedin_user: keyof UserTypes | "";
    }
}
const INITIAL_STATE: Credentials={
    auth:{
        refresh:'',
        access:'',
        username:'',
        curr_loggedin_user:""
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        setCredentials: (state, action:PayloadAction<Credentials>) => {
            console.log(action.payload);
            const { refresh, access, username,  } = action.payload.auth
            if (action.payload.auth.is_normaluser) {
                state.auth.is_normaluser = true;
                state.auth.curr_loggedin_user="is_normaluser";
            }
            if (action.payload.auth.is_restraunt) {
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
            console.log('Heere passed.');
        },
        logOut: (state) => { 
            state.auth.access = null;
            state.auth.refresh = null;
            state.auth.username = '';
            state.auth.id = null;
            state.auth.curr_loggedin_user = "";
            delete state.auth.is_normaluser;
            delete state.auth.is_restaunt;
            delete state.auth.is_superuser;
            delete state.auth.is_matatu;
            delete state.auth.is_filmmaker;
            delete state.auth.is_contentcreator;
            delete state.auth.is_recordlabel;
        },
        switchUser: (state,action: PayloadAction<keyof UserTypes>)=>{
            state.auth.curr_loggedin_user = action.payload
        }
    }
    
})

export const { setCredentials, logOut,switchUser } = authSlice.actions
export default authSlice.reducer
export const selectCurrentRefresh = (state: Credentials) => state.auth.refresh
export const selectCurrentAccess = (state: Credentials) => state.auth.access