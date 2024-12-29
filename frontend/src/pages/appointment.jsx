import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../content/AppContext';
import { useParams } from 'react-router-dom';
import { assets_frontend, doctors } from '../assets/assets_frontend/assets_frontend';

const Appointment = () => {
    const { docId } = useParams();
    const { doctor, currencySymbol } = useContext(AppContext);
    const daysofweek = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT']
    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const fetchDocInfo = () => {
        const docInfo = doctors.find(doc => doc._id === docId);
        setDocInfo(docInfo);
        console.log(docInfo);
    };

    const getAvailableSlots = async () => {
        setDocSlots([]);

        let today = new Date();
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            }
            else {
                currentDate.setHours(10)
                currentDate.setMinutes(10)
            }
            let timeSlots = []
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString({}, { hour: '2-digit', minute: '2-digit' })
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                })
                currentDate.setMinutes(currentDate.getMinutes() + 30)

            }
            setDocSlots(prev => ([...prev, timeSlots]))
            // Add slots to the docSlots state
        }
    };

    useEffect(() => {
        fetchDocInfo();
    }, [doctor, docId]);

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots();
        }
    }, [docInfo]);
    useEffect(() => {
        console.log(docSlots)

    }, [docSlots])

    return docInfo && (
        <div className='flex flex-col gap-4'>
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
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>
                    <p className='text-gray-500 font-medium mt-4'>Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
                </div>
            </div>

            <div className='sm:ml-772 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking slots</p>
                <div>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div key={index}>
                            <p>{item[0] && daysofweek[item[0].datetime.getDay()]}</p>
                            {/* <p>{item[0] && item[0].datatime.getDate()}</p> */}
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Appointment;


