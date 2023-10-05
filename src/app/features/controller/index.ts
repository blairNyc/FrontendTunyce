import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type Controller={
    controller:{
        id: number
        uuid: string
        matatu:{
            id: number
            name: string
            number_plate:string
            number_of_seats: number
            image_exterior:string
            is_trial: boolean
            image_interior:string
            created_at: string
            owner:string
            route: string
        }
    }
}
const INITIAL_STATE: Controller={
    controller:{
        id: 0,
        uuid: '',
        matatu:{
            id: 0,
            name: '',
            number_plate:'',
            number_of_seats: 0,
            image_exterior:'',
            is_trial: false,
            image_interior:'',
            created_at: '',
            owner:'',
            route: ''
        }
    }
}
const controllerSlice = createSlice({
    name: 'controllerSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setControllerCredentials: (state, action: PayloadAction<Controller>) => { 
            state.controller = action.payload.controller
        },
        resetControllerCredentials: (state) => { 
            state.controller = INITIAL_STATE.controller;
        }
    }
});

export const { resetControllerCredentials,setControllerCredentials } = controllerSlice.actions;
export default controllerSlice.reducer;
export const selectUserTheme = (state: Controller) => state.controller.matatu.name;
export const selectCurrentUserTheme = (state: Controller) => state.controller.matatu.name;


