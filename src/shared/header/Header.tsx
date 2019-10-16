import React from 'react'
import cn from './header.module.css'
import logo from '../../logo.png'

export default class Header extends React.Component {
    state = {}

    render() {
        return <div className={cn.header}>
            <div className={cn.logoWrap}>
                <img src={logo} alt='' width={'30'} height={'30'} />
            </div>
            <div>Procedure Scheduler</div></div>
    }
}
