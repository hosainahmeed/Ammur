import React from 'react'

interface VerifyEmailProps {
    onContinue: () => void
    setValues: object
}

function VerifyEmail({ onContinue, setValues }: VerifyEmailProps) {
    console.log(onContinue, email)
    return (
        <div>VerifyEmail</div>
    )
}

export default VerifyEmail