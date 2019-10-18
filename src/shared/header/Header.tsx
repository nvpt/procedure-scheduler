import React from 'react'
import cn from './header.module.css'
import logo from '../../logo.png'

interface propsHeader {}
export const Header: React.FC<propsHeader> = () => {
    return (
        <div className={cn.header}>
            <div className={cn.logoWrap}>
                <img src={logo} alt='' width={'30'} height={'30'} />
            </div>
            <div>Procedure Scheduler</div>
        </div>
    )
}
