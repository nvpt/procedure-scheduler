import React from 'react'
import cn from './footer.module.css'

export default class Footer extends React.Component {
    state = {}

    render() {
        return <div className={cn.footer}>©&nbsp;2019&nbsp;<strong>3Z+</strong></div>
    }
}
