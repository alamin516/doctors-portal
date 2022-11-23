import React from 'react';
import chair from '../../../assets/images/chair.png'
import bg from '../../../assets/images/bg.png'
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({selectedDate, setSelectedDate}) => {

    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${bg})` }}>
            <div className="hero-content flex-col lg:flex-row-reverse gap-20">
                <img src={chair} className="rounded-lg shadow-2xl lg:w-5/12" alt='' />
                <div>
                    <DayPicker className='rounded-lg shadow-2xl lg:p-2'
                        mode='single'
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                    />
                </div>

            </div>

        </div>
    );
};

export default AppointmentBanner;