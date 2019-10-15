import React from 'react'
import cn from './SideMenu.module.css'
import SideMenuList from './components/menu-list/SideMenuList'

export default class SideMenu extends React.Component {
    state = {}

    render() {
        return (
            <div className={cn.SideMenu}>
                <SideMenuList />
            </div>
        )
    }
}
