import { Spinner } from '@nextui-org/spinner';

export default function Loading() {
  return (
    <div className='w-full flex flex-col justify-center'>
      <Spinner />
    </div>
  );
}
