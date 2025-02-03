import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";

interface JobRowProps {
  job: any;
  index: number;
  onEdit: (job: any) => void;
  onDelete: (jobId: string) => void;
}

const JobRow: React.FC<JobRowProps> = ({ job, index, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell>{job.title}</TableCell>
      <TableCell>{job.company}</TableCell>
      <TableCell>{job.location}</TableCell>
      <TableCell>{job.jobType}</TableCell>
      <TableCell>{job.postDate}</TableCell>
      <TableCell className="flex justify-center gap-2">
        <Button variant="default" className="bg-blue-500 text-white" onClick={() => onEdit(job)}>
          Edit
        </Button>
        <Button variant="destructive" className="bg-red-500 text-white" onClick={() => onDelete(job.id)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default JobRow;
