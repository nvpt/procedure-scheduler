export type sexType = 'Male' | 'Female'

export default interface PatientInterface {
    Id: number
    Name: string
    Sex?: sexType
    DayOfBirth?: string
}
