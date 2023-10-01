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
        curr_loggedin_user: keyof UserTypes | ""
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
            const { refresh, access, username,  } = 
                action.payload.auth
                state.auth.is_controller = true;
                state.auth.curr_loggedin_user="is_controller";
                state.auth.refresh = refresh;
                state.auth.access = access;
                state.auth.username = username;
                console.log('authenticated controller');
        },
        logOut: (state) => { 
            state.auth.access = null;
            state.auth.refresh = null;
            state.auth.username = '';
            state.auth.id = null;
            state.auth.curr_loggedin_user = "";
            delete state.auth.is_controller;
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