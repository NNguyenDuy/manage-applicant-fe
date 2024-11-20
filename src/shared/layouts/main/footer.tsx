'use client'

import Link from 'next/link'
import { PATHS } from './routes'
import { usePathname } from 'next/navigation'

export const Footer = () => {
  const CURRENT_YEAR = new Date().getFullYear();
  const pathname = usePathname();
  return (
  <div className="mt-52">
    <div id="section_footer">
        <div className='text-center py-4'>
        {PATHS.HOME.map((item, index) => (
          <Link
            key={item.path}
            href={item.path}
            
          >
            {item.name}
            {index < PATHS.HOME.length - 1 && <span> | </span>}
          </Link>
        ))}
          

          <div className='mt-2 mb-3'>
            <Link href="" target="_blank" className='social-icon mx-1'>
              
            </Link>

            <Link href="" target="_blank" className='social-icon mx-1'>
              
            </Link>

            <Link href="" target="_blank" className='social-icon mx-1'>
              
            </Link>

            <Link href="" target="_blank" className='social-icon mx-1'>
              
            </Link>

            <Link href="" target="_blank" className='social-icon mx-1'>
              
            </Link>
          </div>

          <p>Copyright © {CURRENT_YEAR}, JobCV LLC. All Rights Reserved.</p>
        </div>
      </div>
  </div>

);
}
