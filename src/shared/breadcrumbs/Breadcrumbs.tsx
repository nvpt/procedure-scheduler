import React from 'react';
import cn from './Breadcrumbs.module.css';
import { MENU } from '../../Constants';

export default class Breadcrumbs extends React.Component {
    render() {
        return (
            <div>
                <ul className={cn.breadcrumbs}>
                    <li className={cn.item}>
                        {/*<Link to={MENU.HOME.LINK}>{MENU.HOME.LABEL}</Link>*/}
                    </li>
                </ul>
            </div>
        );
    }
}
