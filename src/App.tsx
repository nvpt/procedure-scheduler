import React from 'react'
import cn from './App.module.css'

import Header from './shared/header/Header'
import Footer from './shared/footer/Footer'
import SideMenu from './shared/side-menu/SideMenu'

const App: React.FC = () => {
    return (
        <div className={cn.App}>
            <Header />
            <SideMenu />
            <div className={cn.Content}>Here will be inserted content</div>
            <Footer />
        </div>
    )
}

export default App
