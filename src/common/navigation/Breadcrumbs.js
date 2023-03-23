import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import BreadcrumbsContext from '@common/navigation/BreadcrumbsContext';

const BasicBreadcrumbs = () => {
  const router = useRouter();
  const {breadcrumbs, setBreadcrumbs} = useContext(BreadcrumbsContext);

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs?.map((breadcrumb, i) => {
          return (
            <li key={breadcrumb.href}>
              {/* <Link href={breadcrumb.href}> */}
                {breadcrumb.text}
              {/* </Link> */}
            </li>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}

export default BasicBreadcrumbs;