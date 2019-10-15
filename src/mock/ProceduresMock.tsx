import ProcedureInterface from '../interfaces/ProcedureInterface'

import { PatientsList } from './PatientsMock'

export const ProceduresList: ProcedureInterface[] = [
    {
        Id: 1,
        Patient: PatientsList[0].Name,
        Description: 'The conduct of radiation imaging of the femur',
        Status: 'Planned',
        PlannedStartTime: '16.10.2019',
        EstimatedEndTime: '30 min',
    },
    {
        Id: 2,
        Patient: PatientsList[1].Name,
        Description:
            'Electrophoresis and massage treatments of the cervical spine',
        Status: 'In Progress',
        PlannedStartTime: '08.10.2019',
        EstimatedEndTime: '1 hour',
    },
]
