import React from 'react'


interface StepDeliveryInfoProps {
    formData: any;
    onChange: (formData: any) => void;
    onNext: () => void;
    onBack: () => void;
    title: string;
}

const StepDeliveryInfo: React.FC<StepDeliveryInfoProps> = ({ formData, onChange, onNext, onBack, title }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...formData, [e.target.name]: e.target.value });
    };

    console.log(formData)
    
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

export default StepDeliveryInfo