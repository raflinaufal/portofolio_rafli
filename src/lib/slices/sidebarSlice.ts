import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SidebarState {
  isCollapsed: boolean
  isMobileOpen: boolean
  activeItem: string
}

const initialState: SidebarState = {
  isCollapsed: false,
  isMobileOpen: false,
  activeItem: '/'
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleCollapsed: (state) => {
      state.isCollapsed = !state.isCollapsed
    },
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload
    },
    toggleMobileOpen: (state) => {
      state.isMobileOpen = !state.isMobileOpen
    },
    setMobileOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileOpen = action.payload
    },
    setActiveItem: (state, action: PayloadAction<string>) => {
      state.activeItem = action.payload
    },
  },
})

export const { 
  toggleCollapsed, 
  setCollapsed, 
  toggleMobileOpen, 
  setMobileOpen, 
  setActiveItem 
} = sidebarSlice.actions
export default sidebarSlice.reducer 