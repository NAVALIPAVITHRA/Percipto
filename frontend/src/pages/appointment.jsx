import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../content/AppContext';
import { useParams } from 'react-router-dom';
import { doctors } from '../assets/assets_frontend/assets_frontend';

const Appointment = () => {
    const { docId } = useParams();
    const { doctor } = useContext(AppContext);
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
        <div>
            <div>
                <img src={docInfo.image} alt={docInfo.name} />
            </div>
        </div>
    );
};

export default Appointment;

