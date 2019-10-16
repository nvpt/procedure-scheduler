export type sexType = 'Male' | 'Female' | null

export default interface PatientInterface {
    Id: number | null
    Name: string
    Sex?: sexType
    DayOfBirth?: string | ''
}
