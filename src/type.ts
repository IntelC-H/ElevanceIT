export type IJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string[];
  responsibilities: string[];
  requirements: string[];
  createdAt: Date;
  updatedAt: Date;
};
