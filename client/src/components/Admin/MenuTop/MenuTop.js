import React from 'react';
import {Button} from 'antd';
import { BarsOutlined, PoweroffOutlined } from '@ant-design/icons';
import logo_menu from '../../../assets/img/png/original.png';
import {logout} from '../../../api/auth';


import './MenuTop.scss';

export default function MenuTop(props) {
    const {menuCollapsed, setMenuCollapsed} = props;

    const logoutUser = () => {
        logout();
        window.location.reload();
    }

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img
                 className="menu-top__left-logo"
                 src={logo_menu}
                 alt="Felipe Iturra"
                />
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                <BarsOutlined />
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={logoutUser} >
                <PoweroffOutlined />
                </Button>
            </div>
        </div>
    )
}