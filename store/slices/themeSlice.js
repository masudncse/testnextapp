import {createSlice} from '@reduxjs/toolkit'

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        toggleSideNav: false,
        breadcrumb: {
            parentPage: {
                pageTitle: "",
                pageLink: ""
            },
            currentPage: "",
            pageTitle: ""
        }
    },
    reducers: {
        SET_TOGGLE_SIDENAV_STATUS: (state, action) => {
            state.toggleSideNav = !state.toggleSideNav
        },
        SET_BREADCRUMB: (state, action) => {
            state.breadcrumb = action.payload
        },
    }
})

export const {
    SET_TOGGLE_SIDENAV_STATUS,
    SET_BREADCRUMB
} = themeSlice.actions

export default themeSlice.reducer;
