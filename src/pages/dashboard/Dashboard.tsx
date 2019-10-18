import React from 'react'
import { MENU } from '../../Constants'
import { NavLink } from 'react-router-dom'
import MenuItemInterface from '../../interfaces/MenuItemInterface'
import cn from './dashboard.module.css'

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className={cn.dashboard}>
                <div className={cn.tiles}>
                    {Object.keys(MENU)
                        .filter((element) => element !== 'HOME')
                        .map((key: any) => {
                            const item: MenuItemInterface = MENU[key]

                            return (
                                <NavLink key={item.LINK} to={item.LINK}>
                                    <div className={cn.tile}>{item.LABEL}</div>
                                </NavLink>
                            )
                        })}
                </div>
            </div>
        )
    }
}
