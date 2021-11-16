import { IScheduleStatus, IScheduleInProgress } from '../../types';

export class AdminEffectsHelper {

    static checkForRunningJob(status: IScheduleStatus): IScheduleInProgress {
        let inProgressState: IScheduleInProgress = {
            progress: false,
            inProgressMessage: null
        };
        for (let job in status) {
            if (status[job] === "RUNNING") {
                let jobName = "";
                switch (job) {
                    case "netting":
                        jobName = "Intraday Netting";
                        break;
                    case "securitiesSettlement":
                        jobName = "Intraday Security Settlement";
                        break;
                    case "cash":
                        jobName = "Intraday Cash Settlement";
                        break;
                    case "start":
                        jobName = "Start Of Day Processes";
                        break;
                    case "end":
                        jobName = "End Of Day Processes";
                        break;
                    default:
                        jobName = job;
                }
                inProgressState = {
                    progress: true,
                    inProgressMessage: `${jobName} currently in progress.`
                };
            }
        }
        return inProgressState;
    }

}