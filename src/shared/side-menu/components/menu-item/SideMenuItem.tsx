import React from 'react'
import { NavLink } from 'react-router-dom'
import cn from './sideMenuItem.module.css'
import MenuItemInterface from '../../../../interfaces/MenuItemInterface'

interface Props {
    item: MenuItemInterface
    className?: string
}

export const SideMenuItem: React.FC<Props> = (props) => {
    return (
        <li className={[cn.sideMenuItem, props.className].join(' ')}>
            <NavLink
                to={props.item.LINK}
                className={cn.link}
                activeClassName={cn.linkActive}
                exact>
                {props.item.LABEL}
            </NavLink>
        </li>
    )
}
