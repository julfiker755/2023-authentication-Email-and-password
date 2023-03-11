import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className='bg-[#142d85] py-2'>
            <ul className='flex justify-center space-x-3'>
                <li className='bg-[#21829c] px-3 rounded-md text-[20px]'><Link to="/">Firebase Email and Password</Link></li>
                <li className='bg-[#21829c] px-3 rounded-md text-[20px]'><Link to="/easy">React Firebase hooks Email and Password</Link></li>
            </ul>
        </div>
    );
};

export default Header;