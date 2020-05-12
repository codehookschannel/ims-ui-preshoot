export interface ResponseDto<T> {
    success?: boolean;
    data?: T;
    message?: string;
}

export interface Link {
    rel?: string;
    href?: string;
}

export interface Candidate {
    id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    identityType?: string;
    identityNumber?: string;
    birthDate?: string;
    experience?: string;
    domain?: string;
    appliedFor?: string;
    links?: Link[];
}

export interface Employee {
    id?: string;
    firstName?: string;
    lastName?: string;
    employeeNumber?: string;
    profile?: string;
    links?: Link[];
    selected?: boolean;
}

export interface InterviewRound {
    id?: any;
    round?: string;
    interviewer?: Employee[];
    interviewers?: string[];
    scheduledTime?: string;
    date?: any;
    time: string;
}

export interface InterviewStatDto {
    status: string;
    date: string;
    count: string;
}

export interface Interview {
    id?: string;
    candidate?: Candidate;
    scheduledBy?: Employee;
    scheduledTime?: any;
    interviewRounds?: InterviewRound[];
    links?: Link[];
    status: InterviewStatus;
}

export enum InterviewStatus {
    REJECTED = 'REJECTED',       // No further rounds will be conducted
    ON_HOLD = 'ON_HOLD',        // Waiting for other candidates performances
    SHORTLISTED = 'SHORTLISTED',    // Application is Shortlisted and waiting for interview
    UNDER_PROCESS = 'UNDER_PROCESS',  // Some rounds completed and some more rounds to be conducted.
    SELECTED = 'SELECTED',       // Candidate Selected for job profile
    SCHEDULED = 'SCHEDULED',      // Interview Scheduled
}

export enum EmployeeProfiles {
    JAVA_DEVELOPER = 'JAVA_DEVELOPER',
    SPRING_DEVELOPER = 'SPRING_DEVELOPER',
    ANGULAR_DEVELOPER = 'ANGULAR_DEVELOPER',
    FULL_STACK_DEVELOPER = 'FULL_STACK_DEVELOPER',
    TEAM_LEAD = 'TEAM_LEAD',
    MODULE_LEAD = 'MODULE_LEAD',
    MANAGER = 'MANAGER',
    ETL = 'ETL',
    HR = 'HR'
}

export const empProfiles = [
    EmployeeProfiles.ANGULAR_DEVELOPER,
    EmployeeProfiles.ETL,
    EmployeeProfiles.FULL_STACK_DEVELOPER,
    EmployeeProfiles.HR,
    EmployeeProfiles.JAVA_DEVELOPER,
    EmployeeProfiles.MANAGER,
    EmployeeProfiles.MODULE_LEAD,
    EmployeeProfiles.SPRING_DEVELOPER,
    EmployeeProfiles.TEAM_LEAD
];

export const companyStacks = [
    'JAVA',
    'SPRING',
    'FULL_STACK',
    'ANGULAR',
    'ETL'
]

export const TIME_LINE = [
    '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00',
    '03:30', '04:00', '04:30', '05:50', '05:30', '06:00', '06:30',
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00',
    '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '13:00',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '16:00',
    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',
    '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
]

