export async function sendResetPasswordEmail(email: string) {
    const data = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    const response = await data.json();
    return response;
}
export async function verifyResetPasswordEmail(resetCode: string) {
    const data = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetCode }),
    });

    const response = await data.json();
    return response;
}
export async function ResetPasswordFunc(resetData : {email: string , newPassword: string}) {
    const data = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resetData),
    });

    const response = await data.json();
    return response;
}