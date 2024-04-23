import React from 'react'


interface StepUploadDataProps {
    formData: any;
    onChange: (formData: any) => void;
    onNext: () => void;
    onBack: () => void;
    title: string;
}


const StepUploadData: React.FC<StepUploadDataProps> = ({ formData, onChange, onNext, onBack, title }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <>
            <div>
                <h2>{title}</h2>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
                <button onClick={onNext}>Next</button>
                <button onClick={onBack}>Back</button>
            </div>
        </>
    )
}

export default StepUploadData