// import React, { useContext, useEffect, useState } from 'react';
// import { AppContext } from '../content/AppContext';
// import { useParams } from 'react-router-dom';
// import { assets_frontend, doctors } from '../assets/assets_frontend/assets_frontend';

// const Appointment = () => {
//     const { docId } = useParams();
//     const { doctor, currencySymbol } = useContext(AppContext);
//     const daysofweek = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
//     const [docInfo, setDocInfo] = useState(null);
//     const [docSlots, setDocSlots] = useState([]);
//     const [slotIndex, setSlotIndex] = useState(0);
//     const [slotTime, setSlotTime] = useState('');

//     const fetchDocInfo = () => {
//         const docInfo = doctors.find(doc => doc._id === docId);
//         setDocInfo(docInfo);
//         console.log(docInfo);
//     };

//     const getAvailableSlots = async () => {
//         setDocSlots([]);

//         let today = new Date();
//         for (let i = 0; i < 7; i++) {
//             let currentDate = new Date(today);
//             currentDate.setDate(today.getDate() + i);
//             let endTime = new Date();
//             endTime.setDate(today.getDate() + i);
//             endTime.setHours(21, 0, 0, 0);
//             if (today.getDate() === currentDate.getDate()) {
//                 currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
//                 currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
//             } else {
//                 currentDate.setHours(10);
//                 currentDate.setMinutes(0);
//             }
//             let timeSlots = [];
//             while (currentDate < endTime) {
//                 let formattedTime = currentDate.toLocaleTimeString({}, { hour: '2-digit', minute: '2-digit' });
//                 timeSlots.push({
//                     datetime: new Date(currentDate),
//                     time: formattedTime
//                 });
//                 currentDate.setMinutes(currentDate.getMinutes() + 30);
//             }
//             setDocSlots(prev => ([...prev, timeSlots]));
//         }
//     };

//     useEffect(() => {
//         fetchDocInfo();
//     }, [doctor, docId]);

//     useEffect(() => {
//         if (docInfo) {
//             getAvailableSlots();
//         }
//     }, [docInfo]);

//     useEffect(() => {
//         console.log(docSlots);
//     }, [docSlots]);

//     return docInfo && (
//         <div className='flex flex-col gap-4'>
//             <div className='flex flex-col sm:flex-row gap-4'>
//                 <div className='flex flex-col gap-4'>
//                     <img className='bg-primary w-full sm:max-w-xs rounded-lg' src={docInfo.image} alt={docInfo.name} />
//                 </div>
//                 <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0'>
//                     <p className='text-xl font-semibold'>{docInfo.name} <img className='inline-block w-5 h-5' src={assets_frontend.verified_icon} alt="Verified Icon" /></p>
//                     <div className='mt-4'>
//                         <p className='text-gray-700'>{docInfo.degree} - {docInfo.speciality}</p>
//                         <button className='bg-blue-500 text-white px-4 py-2 rounded mt-2'>{docInfo.experience} Years of Experience</button>
//                     </div>
//                     <div className='mt-4'>
//                         <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img className='inline-block w-5 h-5' src={assets_frontend.info_icon} alt="Info Icon" /></p>
//                         <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
//                     </div>
//                     <p className='text-gray-500 font-medium mt-4'>Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
//                 </div>
//             </div>

//             <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
//                 <p>Booking slots</p>
//                 <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>  
//                     {docSlots.length > 0 && docSlots.map((item, index) => (
//                         <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
//                             <p>{item[0] && daysofweek[item[0].datetime.getDay()]}</p>
//                             <p>{item[0] && item[0].datetime.getDate()}</p>
//                         </div>
//                     ))}
//                 </div>
//                 <div>
//                     {docSlots.length && docSlots[slotIndex].map((item,index)=>(
//                         <p key={index}>
//                             {item.time.toLowerCase()}
//                         </p>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Appointment;

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../content/AppContext';
import { useParams } from 'react-router-dom';
import { assets_frontend, doctors } from '../assets/assets_frontend/assets_frontend';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
    const { docId } = useParams();
    const { doctor, currencySymbol } = useContext(AppContext);
    const daysofweek = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState(''); // Ensure slotTime is defined

    const fetchDocInfo = () => {
        const docInfo = doctors.find(doc => doc._id === docId);
        setDocInfo(docInfo);
        console.log(docInfo);
    };

    const getAvailableSlots = async () => {
        let today = new Date();
        let allSlots = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date();
            currentDate.setDate(today.getDate() + i);

            let slotsForDay = [];
            let startTime = new Date(currentDate.setHours(10, 0, 0, 0));
            let endTime = new Date(currentDate.setHours(21, 0, 0, 0));

            while (startTime < endTime) {
                slotsForDay.push({
                    datetime: new Date(startTime),
                    time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                });
                startTime.setMinutes(startTime.getMinutes() + 30);
            }

            allSlots.push(slotsForDay);
        }

        setDocSlots(allSlots);
        console.log('Generated Slots:', allSlots);
    };

    useEffect(() => {
        fetchDocInfo();
    }, [docId]);

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots();
        }
    }, [docInfo]);

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

            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length > 0 && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-[64px] rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                            <p>{item[0] && daysofweek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>
                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index} onClick={() => setSlotTime(item.time)}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>
                <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
            </div>
            <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
        </div>
    );
};

export default Appointment;
