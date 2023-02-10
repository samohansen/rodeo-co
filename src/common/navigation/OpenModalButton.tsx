import { useState } from "react";
import Button from '@mui/material/Button';
import {ReactElement, cloneElement} from 'react';

type Props = {
  buttonText: string;
  children: ReactElement;
}

// Use this component to activate a modal on the same page
const OpenModalButton: React.FC<Props> = ({buttonText, children}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setModalOpen(!modalOpen)}>
        {buttonText}
      </Button>
      {modalOpen 
        ? cloneElement(children, {onClose: () => setModalOpen(false)})
        : null}
    </>
  )
}

export default OpenModalButton;