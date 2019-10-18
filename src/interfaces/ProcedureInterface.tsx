import PatientInterface from './PatientInterface'

export type statusType = 'Planned' | 'In Progress' | 'Finished'

export default interface ProcedureInterface {
    Id: number
    Patient: PatientInterface
    Description: string
    Status: statusType
    DateOfProcedure: string
    PlannedStartTime: string
    EstimatedEndTime?: string
}
