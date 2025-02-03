import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

import { format, parseISO } from "date-fns";
interface JobTableProps {
  jobs: any[];
  onEdit: (job: any) => void;
  onDelete: (jobId: string) => void;
}

const JobTable: React.FC<JobTableProps> = ({ jobs, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full border">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center">No</TableHead>
            <TableHead className="text-center">Job Title</TableHead>
            <TableHead className="text-center">Company</TableHead>
            <TableHead className="text-center">Location</TableHead>
            <TableHead className="text-center">Job Type</TableHead>
            <TableHead className="text-center">Post Date</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <TableRow key={job.id} className="text-center">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.jobType}</TableCell>
                <TableCell>
                  {format(parseISO(job.createdAt.toISOString()), "PPP")}
                </TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <Button className="bg-blue-600 text-white" onClick={() => onEdit(job)}>
                    Edit
                  </Button>
                  <Button className="bg-red-600 text-white" onClick={() => onDelete(job.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobTable;
