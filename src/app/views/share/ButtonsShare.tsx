import { IconButton, ToggleButton, Tooltip } from "@mui/material";
import { ReactNode } from "react";

const ButtonsShare = ({
  title,
  handleFunction,
  show,
  icon,
  row,
}: {
  title: string;
  handleFunction: Function;
  show: boolean;
  icon: ReactNode;
  row: any;
}) => {
  return (
    <>
      {show ? (
        <Tooltip title={title}>
          <IconButton
            color="inherit"
            onClick={() => handleFunction({ data: row })}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </>
  );
};

export default ButtonsShare;
