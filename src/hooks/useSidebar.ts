import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { 
  toggleCollapsed, 
  toggleMobileOpen, 
  setMobileOpen, 
  setActiveItem 
} from '@/lib/slices/sidebarSlice';

export const useSidebar = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state: RootState) => state.sidebar);

  return {
    // State
    isCollapsed: sidebar.isCollapsed,
    isMobileOpen: sidebar.isMobileOpen,
    activeItem: sidebar.activeItem,
    
    // Actions
    toggleCollapsed: () => dispatch(toggleCollapsed()),
    toggleMobileOpen: () => dispatch(toggleMobileOpen()),
    setMobileOpen: (open: boolean) => dispatch(setMobileOpen(open)),
    setActiveItem: (item: string) => dispatch(setActiveItem(item)),
  };
}; 