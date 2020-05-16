// $success-clr: #7FB069;
// $error-clr: #D36135;
// $warning-clr: #E6AA68;
// $info-clr: #ECE4B7;

import { InterviewStatus } from './custom-types';

const SELECTED = '#7FB069';
const REJECTED = '#D36135';
const SCHEDULED = '#D36135';
const UNDER_PROCESS = '#D36135';

export const getCalendarClr = (status: string) => {
    switch (status) {
        case InterviewStatus.SELECTED : return SELECTED;
        case InterviewStatus.REJECTED : return REJECTED;
        case InterviewStatus.SCHEDULED : return SCHEDULED;
        case InterviewStatus.UNDER_PROCESS : return UNDER_PROCESS;
        default: return '';
    }
};