import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const convertBreadcrumb = string => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toUpperCase();
};

const BasicBreadcrumbs = () => {
  const router = useRouter();
  console.log(router)
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <li key={breadcrumb.href}>
              <Link href={breadcrumb.href}>
                {/* <a> */}
                  {convertBreadcrumb(breadcrumb.breadcrumb)}
                {/* </a> */}
              </Link>
            </li>
          );
        })}
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    </div>
  );
}

export default BasicBreadcrumbs;