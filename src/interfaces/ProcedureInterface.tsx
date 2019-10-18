export type statusType = 'Planned' | 'In Progress' | 'Finished'

export default interface ProcedureInterface {
    Id: number
    Patient: string
    Description: string
    Status: statusType
    DateOfProcedure: string
    PlannedStartTime: string
    EstimatedEndTime?: string
}
