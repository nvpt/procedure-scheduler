import React from 'react';
import cn from './Breadcrumbs.module.css';
import { Link } from 'react-router-dom';
import { PATH } from '../../Constants';

export default class Breadcrumbs extends React.Component {

    render() {
        return (
            <div>
                <ul className={cn.breadcrumbs}>
                    <li className={cn.item}>
                        <Link to={PATH.HOME.LINK}>{PATH.HOME.LABEL}</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
