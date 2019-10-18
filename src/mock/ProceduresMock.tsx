import ProcedureInterface from '../interfaces/ProcedureInterface'

import { PatientsList } from './PatientsMock'

export const ProceduresList: ProcedureInterface[] = [
    {
        Id: 1,
        Patient: PatientsList[0].Name,
        Description: 'The conduct of radiation imaging of the femur',
        Status: 'Planned',
        DateOfProcedure:'2019-10-16',
        PlannedStartTime: '9:20',
        EstimatedEndTime: '10:10',
    },
    {
        Id: 2,
        Patient: PatientsList[1].Name,
        Description:
            'Electrophoresis and massage treatments of the cervical spine',
        Status: 'In Progress',
        DateOfProcedure:'2019-15-16',
        PlannedStartTime: '7:30',
        EstimatedEndTime: '18:00',
    },
]
