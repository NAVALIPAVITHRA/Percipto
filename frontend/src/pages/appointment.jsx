import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../content/AppContext';
import { useParams } from 'react-router-dom';
import { assets_frontend, doctors } from '../assets/assets_frontend/assets_frontend';

const Appointment = () => {
    const { docId } = useParams();
    const { doctor,currencySymbol } = useContext(AppContext);
    const [docInfo, setDocInfo] = useState(null);

    const fetchDocInfo = () => {
        const docInfo = doctors.find(doc => doc._id === docId);
        setDocInfo(docInfo);
        console.log(docInfo);
    };

    useEffect(() => {
        fetchDocInfo();
    }, [doctor, docId]);

    return docInfo && (
        <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4'>
                <img className='bg-primary w-full sm:max-w-xs rounded-lg' src={docInfo.image} alt={docInfo.name} />
            </div>
            <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0'>
                <p className='text-xl font-semibold'>{docInfo.name} <img className='inline-block w-5 h-5' src={assets_frontend.verified_icon} alt="Verified Icon" /></p>
                <div className='mt-4'>
                    <p className='text-gray-700'>{docInfo.degree} - {docInfo.speciality}</p>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded mt-2'>{docInfo.experience} Years of Experience</button>
                </div>
                <div className='mt-4'>
                    <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img className='inline-block w-5 h-5' src={assets_frontend.info_icon} alt="Info Icon" /></p>
                    <p className='text-sm text-gray-500 max-w-[700px] mt-1' >{docInfo.about}</p>
                </div>
                <p>Appointment fee: <span>{currencySymbol}{docInfo.fees}</span>
                </p>
            </div>
        </div>
    );
};

export default Appointment;


