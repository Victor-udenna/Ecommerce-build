'use client';

import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center  bg-gray-50 z-[7000]">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#000"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
