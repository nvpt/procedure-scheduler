import React from 'react'
import cn from './SideMenuItem.module.css'
import MenuItemInterface from '../../../../interfaces/MenuItemInterface'
interface Props {
    item: MenuItemInterface
    className: string
}

export const SideMenuItem: React.FC<Props> = ({ item, className }) => {
    return <li className={[cn.SideMenuItem, className].join(' ')}>{item.LABEL}</li>
}
