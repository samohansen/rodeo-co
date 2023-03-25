import { useState } from "react";
import Button from '@mui/material/Button';
import {ReactElement, cloneElement} from 'react';
import type { ButtonProps } from "@mui/material";

type Props = {
  buttonText: string;
  buttonProps?: ButtonProps;
  children: ReactElement;
}

// Use this component to activate a modal on the same page. 
// Give it one child that's a modal or dialogue
const OpenModalButton: React.FC<Props> = ({buttonText, buttonProps, children}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button {...buttonProps} onClick={() => setModalOpen(!modalOpen)}>
        {buttonText}
      </Button>
      {modalOpen 
        ? cloneElement(children, {onClose: () => setModalOpen(false)})
        : null}
    </>
  )
}

export default OpenModalButton;
