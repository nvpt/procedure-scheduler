import React from 'react'
import cn from './App.module.css'

import Header from './shared/header/Header'
import Footer from './shared/footer/Footer'
import SideMenu from './shared/side-menu/SideMenu'

const App: React.FC = () => {
    return (
        <div className={cn.App}>
            <SideMenu />
            <div className={cn.Wrapper}>
                <Header />
                <div className={cn.Container}>
                    <div className={cn.Content}>
                        Here will be inserted content
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default App
