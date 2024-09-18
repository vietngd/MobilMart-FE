import Dialog from "@mui/material/Dialog";
import clsx from "clsx";
import { IconX } from "../icons/common";
import React from "react";

const BasicDialog = (props) => {
  const {
    title,
    open,
    onClose,
    children,
    maxWidth,
    showCloseIcon,
    sx,
    titleClass,
    contentClassContainer,
    ...other
  } = props;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth={maxWidth || "sm"}
      sx={{
        ".MuiPaper-root": {
          borderRadius: "8px",
          "& ::-webkit-scrollbar": {
            height: "8px",
          },
        },
        ".MuiDialog-paperWidthMd": {
          maxWidth: "800px",
        },
        ...sx,
      }}
      {...other}
    >
      <div className={clsx("py-3", contentClassContainer)}>
        <div className="flex flex-row items-center justify-between px-4">
          {title && (
            <p className={clsx("text-[22px] font-bold", titleClass || "")}>
              {title}
            </p>
          )}
          {showCloseIcon && (
            <button
              className="flex cursor-pointer justify-end"
              onClick={onClose}
            >
              <IconX />
            </button>
          )}
        </div>
        <div className="px-0">{children}</div>
      </div>
    </Dialog>
  );
};

export default BasicDialog;
