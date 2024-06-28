import Image from 'next/image';
import Link from 'next/link';
import useUserId from '../hooks/useUserId';
import SpinnerMini from '@/app/components/SpinnerMini';

export default function ProfileHeader() {
  const {userInfo, isLoading,isError} = useUserId();

  if (isLoading) return <div><SpinnerMini/></div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-[#18181B]">
      <Link href="/user/profile" className="flex items-center gap-2 bg-white dark:bg-black p-4 hover:bg-gray-50">
        <Image
          alt=""
          width={40}
          height={40}
          src="/avatar-159236_1280.png"
          className="rounded-full object-cover"
        />

        <div>
          <p className="text-xs">
            <strong className="block font-medium">{userInfo?.name}</strong>
            <span> {userInfo?.email}</span>
          </p>
        </div>
      </Link>
    </div>
  );
}
