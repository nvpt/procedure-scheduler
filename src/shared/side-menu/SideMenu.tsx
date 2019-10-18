import React from 'react'
import cn from './sideMenu.module.css'
import { SideMenuList } from './components/menu-list/SideMenuList'
import logo from '../../logo.png'

interface propsMenu {}

export const SideMenu: React.FC<propsMenu> = () => {
    return (
        <div className={cn.sideMenu}>
            <SideMenuList />
        </div>
    )
}
