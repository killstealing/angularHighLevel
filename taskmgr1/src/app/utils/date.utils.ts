import { parse, isDate, isValid, isFuture, differenceInYears } from 'date-fns';

export const isValidDate = (dateStr: string): boolean => {
    const val = parse(dateStr);
    const flag = isDate(val) &&
        isValid(val) &&
        !isFuture(val) &&
        differenceInYears(Date.now(), val) < 150;
    return flag;
};
