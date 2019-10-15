import React from 'react'
import cn from './sideMenu.module.css'
import { SideMenuList } from './components/menu-list/SideMenuList'

interface Props {}

export const SideMenu: React.FC<Props> = () => {
    return (
        <div className={cn.sideMenu}>
            <SideMenuList />
        </div>
    )
}
