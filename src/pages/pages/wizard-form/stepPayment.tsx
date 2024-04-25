import React from 'react'


interface StepPaymentsProps {
    formData: any;
    onChange: (formData: any) => void;
    title: string;
}

const StepPayment: React.FC<StepPaymentsProps> = ({ formData, onChange, title }) => {

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
                    value={formData?.firstName || ''}
                    onChange={handleChange}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData?.lastName || ''}
                    onChange={handleChange}
                    placeholder="Last Name"
                />

            </div>
        </>
    )
}


export default StepPayment