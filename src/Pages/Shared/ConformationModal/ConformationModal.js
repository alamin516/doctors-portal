import React from 'react';

const ConformationModal = ({title, message, closeModal, handleDoctorDelete, modalData, deleteBtnText}) => {
    return (
        <div>
            <input type="checkbox" id="conformation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={()=>handleDoctorDelete(modalData._id)}  htmlFor="conformation-modal" className="btn bg-red-600 border-none tex-white">{deleteBtnText}</label>
                        <label onClick={closeModal} className="btn btn-outline">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConformationModal;