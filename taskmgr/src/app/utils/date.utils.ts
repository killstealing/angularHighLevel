import { parse, isDate, isValid, isFuture, differenceInYears } from 'date-fns';

export function formatDate(date: string) {
    // 格式化日期，获取今天的日期
    const Dates = new Date(date);
    const year: number = Dates.getFullYear();
    const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day + ` 00:00:00`;
}
export function getDate() {
    const Dates = new Date();
    const year: number = Dates.getFullYear();
    const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day + ` 00:00:00`;
}

export const isValidDate = (dateStr: string): boolean => {
    const val = parse(dateStr);
    const flag = isDate(val) &&
        isValid(val) &&
        !isFuture(val) &&
        differenceInYears(Date.now(), val) < 150;
    return flag;
};
