import Image from 'next/image';
import React from 'react';

const Header = () => {
    return (
      <header>
        <Image src="/logoipsum.png" alt="Logo Header" width={160} height={30} />
      </header>
    );
  };
  
  export default Header;