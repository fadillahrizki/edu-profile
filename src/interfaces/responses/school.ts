import { School, Statistic } from "../school";
export interface GetConfigSchool {
    message: string,
    data: School
}

export interface GetStatisticSchool {
    message: string,
    data: Statistic
}
