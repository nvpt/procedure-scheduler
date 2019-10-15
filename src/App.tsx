import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import cn from './app.module.css'

import { MENU } from './Constants'
import Header from './shared/header/Header'
import Footer from './shared/footer/Footer'
import { SideMenu } from './shared/side-menu/SideMenu'
import Doctors from './pages/doctors/Doctors'
import Patients from './pages/patients/Patients'
import Procedures from './pages/procedures/Procedures'

const App: React.FC = () => {
    return (
        <div className={cn.app}>
            <Router>
                <SideMenu />
                <div className={cn.wrapper}>
                    <Header />
                    <div className={cn.container}>
                        <div className={cn.content}>
                            <Redirect from='/' to={MENU.DOCTORS.LINK} />
                            <Route
                                exact
                                path={MENU.DOCTORS.LINK}
                                component={Doctors}
                            />
                            <Route
                                exact
                                path={MENU.PATIENTS.LINK}
                                component={Patients}
                            />
                            <Route
                                exact
                                path={MENU.PROCEDURES.LINK}
                                component={Procedures}
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
