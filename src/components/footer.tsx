import Image from 'next/image';
import Link from 'next/link';
import React from "react";

const Footer = () => {
    return (
        <footer>
        <Image src="/logoipsumBranco.png" alt="Logo Header" width={160} height={30} />
        <hr />
        <div>
            <span>
                <ul>
                    <li><Link href="https://slideworks.cc/" target="_blank"> Terms & Conditions </Link></li>
                    <li><Link href="https://slideworks.cc/" target="_blank"> Privacy Policy </Link></li>
                </ul>
            </span>
            <span>
                <ul>
                    <li><Link href="https://facebook.com.br" target="_blank"><i className="fa-brands fa-facebook-f"></i></Link></li>
                    <li><Link href="https://x.com" target="_blank"><i className="fa-brands fa-twitter"></i></Link></li>
                    <li><Link href="https://instagram.com.br" target="_blank"><i className="fa-brands fa-instagram"></i></Link></li>
                </ul>
            </span>
        </div>
    </footer>
    );
};

export default Footer;