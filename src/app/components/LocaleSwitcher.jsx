import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation'; // use 'next/navigation' instead of 'next/router'
import React, { useTransition, useEffect, useState } from 'react';

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  const localeActive = useLocale();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const onSelectChange = (e) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  return (
    <label className='border-2 rounded bg-de'>
      <p className='sr-only'>Change language</p>
      <select
        className='bg-transparent py-2'
        onChange={onSelectChange}
        defaultValue={localeActive}
        disabled={isPending}
      >
        <option value='en' className=' bg-default-50 text-md '>English</option>
        <option value='fr' className=' bg-default-50 text-md '>French</option>
      </select>
    </label>
  );
}
