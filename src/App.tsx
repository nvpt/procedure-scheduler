import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import cn from './App.module.css'

import { MENU } from './Constants'
import Header from './shared/header/Header'
import Footer from './shared/footer/Footer'
import SideMenu from './shared/side-menu/SideMenu'
import Doctors from './pages/doctors/Doctors'
import Patients from './pages/patients/Patients'

const App: React.FC = () => {
    return (
        <div className={cn.App}>
            <Router>
                <SideMenu />
                <div className={cn.Wrapper}>
                    <Header />
                    <div className={cn.Container}>
                        <div className={cn.Content}>
                            <Route exact path={MENU.DOCTORS.LINK} component={Doctors} />
                            <Route
                                exact
                                path={MENU.PATIENTS.LINK}
                                component={Patients}
                            />
                        </div>
                    </div>
                    <Footer />
                </div>
            </Router>
        </div>
    )
}

export default App
