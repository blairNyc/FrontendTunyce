import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Credentials{
    refresh:string | null,
    access:string | null,
    first_name: string,
    last_name: string,
    email: string,
    hesquserrole: number,
    id: number
};
// Retrieve the JSON string
const INITIAL_STATE: Credentials={
    refresh:'',
    access:'',
    first_name:'',
    last_name:'',
    email:'',
    hesquserrole:1,
    id: 0
}

const authSlice = createSlice({
    name: 'auth',
    initialState: { refresh: null, access: null, first_name: null, last_name: null, email: null, hesquserrole:null, id: null  },
    reducers: {
        setCredentials: (state, action) => { 
            const { refresh, access, first_name, last_name, email,hesquserrole, id } = action.payload
            state.refresh = refresh;
            state.access = access;
            state.first_name = first_name;
            state.last_name = last_name;
            state.email = email;
            state.hesquserrole = hesquserrole;
            state.id = id
        },
        setUpgradeCredentials: (state, action) => { 
            const { hesquserrole } = action.payload
            state.hesquserrole = hesquserrole;
        },
        logOut: (state, action: PayloadAction) => { 
            state.access = null;
            state.refresh = null
        }
    }
})

export const { setUpgradeCredentials, setCredentials, logOut } = authSlice.actions
export default authSlice.reducer
export const selectCurrentRefresh = (state: any) => state.auth.refresh
export const selectCurrentAccess = (state: any) => state.auth.access