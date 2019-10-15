import React from 'react'
import cn from './dideMenuList.module.css'
import { MENU } from '../../../../Constants'
import { SideMenuItem } from '../menu-item/SideMenuItem'
import MenuItemInterface from '../../../../interfaces/MenuItemInterface'

interface Props {}
export const SideMenuList: React.FC<Props> = () => {
    return (
        <ul className={cn.sideMenuList}>
            {Object.keys(MENU).map((item: string, i) => {
                const menuItem: MenuItemInterface = MENU[item]
                return (
                    <SideMenuItem
                        key={item}
                        item={menuItem}
                        className={cn.item}
                    />
                )
            })}
        </ul>
    )
}
