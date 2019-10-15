import React from 'react'
import cn from './SideMenuList.module.css'
import { MENU } from '../../../../Constants'
import { SideMenuItem } from '../menu-item/SideMenuItem'
import MenuItemInterface from '../../../../interfaces/MenuItemInterface'

export default class SideMenuList extends React.Component {
    state = {}

    render() {
        return (
            <ul className={cn.SideMenuList}>
                {Object.keys(MENU).map((item: string, i) => {
                    const menuItem: MenuItemInterface = MENU[item]
                    return (
                        <SideMenuItem
                            key={item}
                            item={menuItem}
                            className={cn.Item}
                        />
                    )
                })}
            </ul>
        )
    }
}
