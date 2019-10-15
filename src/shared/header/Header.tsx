import React from 'react'
import cn from './header.module.css'

export default class Header extends React.Component {
    state = {}

    render() {
        return <div className={cn.header}>Procedure Scheduler</div>
    }
}
