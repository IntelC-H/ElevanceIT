import { FC } from "react";
import { format, parseISO } from "date-fns";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { IJob } from "~/type";

type JobItemProps = {
    JD: IJob;
    onSelectJob: (job: IJob) => void;
};

const JobItem: FC<JobItemProps> = ({ JD, onSelectJob }) => {
    return (
        <Card className="cursor-pointer rounded-md border border-[#CCD3D3] shadow" onClick={() => onSelectJob(JD)}>
            <CardHeader>
                <h4 className="text-lg font-semibold text-gray-900">
                    {JD.company.length > 20 ? JD.company.substring(0, 20) + "..." : JD.company}
                </h4>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">{JD.title}</p>
                <p className="text-sm text-gray-600">{JD.location}</p>
                <p className="text-sm text-gray-600">{JD.jobType}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                    {format(parseISO(JD.createdAt.toISOString()), "PPP")}
                </span>
            </CardFooter>
        </Card>
    );
};

export default JobItem;
