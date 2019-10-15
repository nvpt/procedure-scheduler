import React from 'react'
import cn from './sideMenu.module.css'
import { SideMenuList } from './components/menu-list/SideMenuList'
import logo from '../../logo.png'

interface Props {}

export const SideMenu: React.FC<Props> = () => {
    return (
        <div className={cn.sideMenu}>
            <div className={cn.logoWrap}>
                <img src={logo} alt='' width={'40'} height={'40'} />
            </div>
            <SideMenuList />
        </div>
    )
}
