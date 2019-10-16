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
import Rooms from './pages/rooms/Rooms'
import { connect } from 'react-redux'
import PatientInterface from './interfaces/PatientInterface'
import { patientsActions } from './store-global/reducers/PatientsReducer'
import { PatientsList } from './mock/PatientsMock'

interface PropsApp {
    onGetPatients?: (patients: PatientInterface[]) => void
}
interface StateApp {}
class App extends React.Component<PropsApp, StateApp> {
    constructor(props: PropsApp) {
        super(props)
        this.getPatients()
    }

    /**
     * to avoid repeat request in child components
     */
    getPatients() {
        PatientsList &&
            this.props.onGetPatients &&
            this.props.onGetPatients(PatientsList)
    }

    render() {
        return (
            <div className={cn.app}>
                <Router>
                    <SideMenu />
                    <div className={cn.wrapper}>
                        <Header />
                        <div className={cn.container}>
                            <div className={cn.content}>
                                <Redirect from='/' to={MENU.PROCEDURES.LINK} />
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
                                <Route
                                    exact
                                    path={MENU.ROOMS.LINK}
                                    component={Rooms}
                                />
                            </div>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </div>
        )
    }
}

export default connect(
    (storeGlobal: any) => storeGlobal,
    (dispatch) => ({
        onGetPatients: (patients: PatientInterface[]) => {
            dispatch({ type: patientsActions.GET_PATIENTS, patients })
        },
    }),
)(App)
