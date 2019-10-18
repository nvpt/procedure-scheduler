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

export default class Rooms extends React.Component<RoomsProps, RoomsState> {
    state: RoomsState = {
        rooms: RoomsList,
        emptyPlaceholder: 'No Rooms.',
    }
    render() {
        const { rooms, emptyPlaceholder } = this.state

        return (
            <div className={cn.rooms}>
                <TopPanel title={'Rooms'} />
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    {rooms && rooms.length ? (
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
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={2}>{emptyPlaceholder}</td>
                            </tr>
                        </tbody>
                    )}
                </Table>
            </div>
        )
    }
}
