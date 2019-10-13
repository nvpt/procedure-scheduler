import Patient from './Patient'

type statusType = 'Planned' | 'In Progress' | 'Finished';

export default interface Procedure {
    Id: number;
    Patient: Patient[];
    Description: string;
    Status: statusType;
    PlannedStartTime: string;
    EstimatedEmdTime?: string;
}
