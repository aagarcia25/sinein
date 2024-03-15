import { IconButton, ToggleButton, Tooltip } from "@mui/material";
import { ReactNode } from "react";

const ButtonsShare = ({
  title,
  handleFunction,
  show,
  icon,
  row,
  tipo,
}: {
  title: string;
  handleFunction: Function;
  show: boolean;
  icon: ReactNode;
  row: any;
  tipo: string;
}) => {
  return (
    <>
      {show ? (
        <Tooltip title={title}>
          <IconButton
            color="inherit"
            onClick={() => handleFunction({ data: row, tipo: tipo })}
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
