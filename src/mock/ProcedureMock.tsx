import ProcedureInterface from '../interfaces/ProcedureInterface'

import { PatientsList } from './PatientsMock'

export const ProcedureMock: ProcedureInterface[] = [
    {
        Id: 1,
        Patient: [PatientsList[0]],
        Description: 'The conduct of radiation imaging of the femur',
        Status: 'Planned',
        PlannedStartTime: '16.10.2019',
        EstimatedEmdTime: '30 min',
    },
    {
        Id: 2,
        Patient: [PatientsList[1]],
        Description:
            'Electrophoresis and massage treatments of the cervical spine',
        Status: 'In Progress',
        PlannedStartTime: '08.10.2019',
        EstimatedEmdTime: '1 hour',
    },
]
