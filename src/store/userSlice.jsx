import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        username: '',
    },
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id;
            state.username = action.payload.username;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
