const API_URL_DEV = import.meta.env.VITE_API_URL

export const endpoints = {

    REGISTER : `${API_URL_DEV}/register/`,
    REG_VERIFY_OTP : `${API_URL_DEV}/verify/otp/`,
    SET_STUDENT : `${API_URL_DEV}/set-is-student/`,
    LOGIN : `${API_URL_DEV}/login/`,

    USER_PROFILE:`${API_URL_DEV}/user/profile/`,

    CREATE_SCHOLARSHIP :`${API_URL_DEV}/scholarship-provider/create/`
}