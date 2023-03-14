import * as React from 'react';
import { ReactNode } from 'react';

type Props = {
  headers: string[];
  children: ReactNode[];
}

// This component requires prop: headers as an array of header names
// It also requires child components to be **in the same order** as the headers list

//(the below is deprecated but I want to leave it in case I change it back to using proper keys)
// have a key that matches the index of the corresponding tabName (the child components become the "children" prop)
//   *Only one child component per key. If you want multiple components on a tab, 
//   *they need to be wrapped and the wrapper given the key
const PageDetails: React.FC<Props> = ({headers, children}) => {
  return (
    <div>
      {headers.map((header, i) => (
        <div>
          <h2>{header}</h2>
          {children[i]}
        </div>
      ))}
    </div>
  );
};

export default PageDetails;