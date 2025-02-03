import ReactDom from "react-dom";
import React, { FC } from "react";

type IJobModal = {
  openEditJobModal: boolean;
  setOpenEditJobModal: (open: boolean) => void;
  children: React.ReactNode;
};

const EditJobModal: FC<IJobModal> = ({
  openEditJobModal,
  setOpenEditJobModal,
  children,
}) => {
  if (!openEditJobModal) return null;
  return ReactDom.createPortal(
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-[1000]"
        onClick={() => setOpenEditJobModal(false)}
      ></div>
      <div className="max-w-lg w-full rounded-md fixed top-[5%] xl:top-[10%] left-1/2 -translate-x-1/2 bg-white z-[1001] p-6">
        {children}
      </div>
    </>,
    document.getElementById("job-modal") as HTMLElement
  );
};

export default EditJobModal;
