import React from 'react'

const DoctorAbout = ({ name, bio, education, experience,currentWorkingHospital }) => {
    return (
        <div className='mt-10'>
            <div>
                <h3 className=' text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                    About of
                    <span className='text-irishBlueColor font-bold text-[24px] leading-9'>
                        {name}
                    </span>

                </h3>

                <p className='text__para'>
                   {bio}
                </p>
            </div>

            <div className='mt-12'>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                    Education
                </h3>
                <div className='mt-5 flex flex-col gap-4 mb-10'>
                    <div className='bg-[#CCF0f3] text-irishBlueColor py-4 px-6 rounded shadow-md text-[16px] leading-6 font-semibold border border-transparent hover:border-red-200'>
                        <h4 className='text-lg font-bold'>Qualifications</h4>
                        <p className='text-red-300'>{education} </p>
                    </div>
                    <div className='bg-[#CCF0f3] text-irishBlueColor py-4 px-6 rounded shadow-md text-[16px] leading-6 font-semibold border border-transparent hover:border-red-200'>
                        <h4 className='text-lg font-bold'>Current Working Hospital</h4>
                        <p className='text-red-300'>{currentWorkingHospital}</p>
                    </div>
                    <div className='bg-[#CCF0f3] text-irishBlueColor py-4 px-6 rounded shadow-md text-[16px] leading-6 font-semibold border border-transparent hover:border-red-200'>
                        <h4 className='text-lg font-bold'>Experience</h4>
                        <p className='text-red-300'>{experience} years</p>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default DoctorAbout
