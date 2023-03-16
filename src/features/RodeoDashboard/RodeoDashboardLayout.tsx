import { ReactNode } from "react";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from '@mui/material/Link';

type Props = {
  children?: ReactNode | ReactNode[];
}

// this is all the grossest possible hack
const RodeoDashboardLayout: React.FC<Props> = ({children}) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.pathname.split('/');
      linkPath.shift();
      linkPath.shift(); // clear base "rodeo" out

      const pathArray = linkPath.map((path, i) => {
        return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);
  return (<>
    {
      !breadcrumbs || breadcrumbs.length === 0 ? (
        <h1>Rodeos</h1>
      ) : breadcrumbs.length === 1 ? (
        <h1>[rodeoName]</h1>
      ) : breadcrumbs.length === 2 ? (
        <h1><Link>[rodeoName]</Link> {'>'} [EventName]</h1>
      ) : null
    }
    {children}
  </>
  );
};

export default RodeoDashboardLayout;