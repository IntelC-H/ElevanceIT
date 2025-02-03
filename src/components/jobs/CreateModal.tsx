import ReactDom from "react-dom";
import React, { FC } from "react";

type IJobModal = {
  openJobModal: boolean;
  setOpenJobModal: (open: boolean) => void;
  children: React.ReactNode;
};

const JobModal: FC<IJobModal> = ({
  openJobModal,
  setOpenJobModal,
  children,
}) => {
  if (!openJobModal) return null;
  return ReactDom.createPortal(
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-[1000]"
        onClick={() => setOpenJobModal(false)}
      ></div>
      <div className="max-w-lg w-full rounded-md fixed top-[5%] xl:top-[10%] left-1/2 -translate-x-1/2 bg-white z-[1001] p-6">
        {children}
      </div>
    </>,
    document.getElementById("job-modal") as HTMLElement
  );
};

export default JobModal;
