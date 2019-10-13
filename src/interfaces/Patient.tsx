type sexType = 'male' | 'female';

export default interface Patient {
    Id: number;
    Name: string
    Sex?: sexType;
    DayOfBirth?: string //todo ***
}
