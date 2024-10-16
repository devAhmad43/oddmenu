import {faLocationDot,faPhone, faWifi  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Banner = () => {
  return (
    <>
<div className="w-full flex justify-center gap-2 overflow-x-auto py-1 whitespace-nowrap bg-red-600 text-white text-xs sm:text-sm md:text-base lg:text-lg">
<p className=""><span><FontAwesomeIcon className='w-4 h-4' icon={faLocationDot} />
</span>Kontraktova ploshcha 1, Kyiv, Ukraine
 </p>
 <p><FontAwesomeIcon className='w-4 h-4 mr-2' icon={faPhone} /> 
 099 123 4567
</p>
 <p><FontAwesomeIcon className='w-4 h-4 mr-2' icon={faWifi} /> 
 WiFi_Password123
</p>
</div>
    </>
  )
}

export default Banner