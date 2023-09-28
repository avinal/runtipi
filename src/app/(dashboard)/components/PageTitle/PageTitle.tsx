'use client';

import { MessageKey } from '@/server/utils/errors';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const PageTitle = () => {
  const t = useTranslations();

  const path = usePathname();

  const pathArray = path?.substring(1).split('/') || [];

  const renderBreadcrumbs = () => {
    return (
      <ol className="breadcrumb" aria-label="breadcrumbs">
        {pathArray.map((breadcrumb, index) => (
          <li key={breadcrumb} className={clsx('breadcrumb-item', { active: index === pathArray.length - 1 })}>
            <Link href={`/${pathArray.slice(0, index + 1).join('/')}`}>{breadcrumb}</Link>
          </li>
        ))}
      </ol>
    );
  };

  const appTitle = apps.find((app) => app.id === pathArray[1])?.name;
  const title = appTitle ?? t(`header.${pathArray[pathArray.length - 1]}` as MessageKey);

  return (
    <>
      <div className="page-pretitle">{renderBreadcrumbs()}</div>
      <h2 className="page-title">{title}</h2>
    </>
  );
};