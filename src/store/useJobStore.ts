import { create } from "zustand";
import { IJob } from "~/type";

interface JobStoreState {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedJob: IJob | null;
  setSelectedJob: (job: IJob | null) => void;
  openJobModal: boolean;
  setOpenJobModal: (value: boolean) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
  jobs: IJob[];
  setJobs: (jobs: IJob[]) => void;
  deleteJob: (jobId: string) => void;
  editJob: (job: IJob) => void;
}

export const useJobStore = create<JobStoreState>((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set(() => ({ currentPage: page })),
  selectedJob: null,
  setSelectedJob: (job) => set({ selectedJob: job }),
  openJobModal: false,
  setOpenJobModal: (value) => set({ openJobModal: value }),
  isMobile: false,
  isEditing: false,
  setIsEditing: (value) => set({ isEditing: value }),
  setIsMobile: (value) => set({ isMobile: value }),
  jobs: [],
  setJobs: (jobs) => set({ jobs }),
  deleteJob: (jobId) => set((state) => ({ jobs: state.jobs.filter((job) => job.id !== jobId) })),
  editJob: (updatedJob) =>
    set((state) => ({
      jobs: state.jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)),
    })),
}));
