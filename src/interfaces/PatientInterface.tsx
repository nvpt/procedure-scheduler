export type sexType = 'Male' | 'Female' | null

export default interface PatientInterface {
    Id: number
    Name: string
    Sex?: sexType
    DayOfBirth?: string | null
}
