import React from 'react'

import cn from './rooms.module.css'
import { RoomsList } from '../../mock/RoomsMock'
import RoomInterface from '../../interfaces/RoomInterface'
import { Table } from 'react-bootstrap'
import TopPanel from '../../shared/top-panel/TopPanel'

interface RoomsProps {}
interface RoomsState {
    rooms: Array<RoomInterface>
    emptyPlaceholder: string
}

export default class Rooms extends React.Component<
    RoomsProps,
    RoomsState
> {
    state: RoomsState = {
        rooms: RoomsList,
        emptyPlaceholder: 'No Rooms.',
    }
    render() {
        const { rooms, emptyPlaceholder } = this.state

        if (rooms && rooms.length) {
            return (
                <div className={cn.rooms}>
                    <TopPanel title={'Rooms'}/>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((doctor) => {
                                return (
                                    <tr key={doctor.Id}>
                                        <td>{doctor.Id}</td>
                                        <td>{doctor.Name}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return <div className={cn.rooms}>{emptyPlaceholder}</div>
        }
    }
}
