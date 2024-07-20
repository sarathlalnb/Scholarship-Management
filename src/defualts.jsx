const API_URL_DEV = import.meta.env.VITE_API_URL

export const endpoints = {

    REGISTER : `${API_URL_DEV}/register/`,
    REG_VERIFY_OTP : `${API_URL_DEV}/verify/otp/`,
    SET_STUDENT : `${API_URL_DEV}/set-is-student/`,
    LOGIN : `${API_URL_DEV}/login/`,

    USER_PROFILE:`${API_URL_DEV}/user/profile/`,

    CREATE_SCHOLARSHIP :`${API_URL_DEV}/scholarship-provider/create/`,
    VIEW_SCHROLPRO_DETAILS :`${API_URL_DEV}/scholarship-provider/detail/`,
    LIST_ALLSCHROLPRO : `${API_URL_DEV}/providers`,
    LIST_SCHROLSS : `${API_URL_DEV}/scholarship/list/`,
    APPLY_SCHROL: `${API_URL_DEV}/apply-scholarship/`,

    CREATE_SCHROL : `${API_URL_DEV}/scholarship/create/`,
    LIST_SCHROL : `${API_URL_DEV}/scholarship/my-provided-scholarships/`,
    VIEW_SPSCHROL : `${API_URL_DEV}/scholarship-detail/`,
    VIEW_APPLICANTS : `${API_URL_DEV}/applied-scholarships/`,

    UPDATE_APPLICANT_STATUS : `${API_URL_DEV}/update-application-status/`,
    DO_EXAM : `${API_URL_DEV}/exam/`,

    PROVIDE_SCHROL : `${API_URL_DEV}/scholarship/confirm/`

}