import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
}

interface UsersState {
    list: User[];
}

const initialState: UsersState = {
    list: [],
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser(state, action: { payload: User }) {
            state.list.push(action.payload);
        },
        removeUser(state, action: { payload: string }) {
            state.list = state.list.filter(user => user.id !== action.payload);
        },
    },
});

export const { addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
