import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roleIds: [],
    positions: [],
    isLoadingGenders: false,
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: [],
    clinics: [],
    specialties: [],
    handbooks: [],
    bookings: [],
    doctor: []
    // patientBookings: [],

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.ADMIN_LOGIN_SUCCESS:
        //     return {
        //         ...state,
        //         isLoggedIn: true,
        //         adminInfo: action.adminInfo
        //     }
        // case actionTypes.ADMIN_LOGIN_FAIL:
        //     return {
        //         ...state,
        //         isLoggedIn: false,
        //         adminInfo: null
        //     }
        // case actionTypes.PROCESS_LOGOUT:
        //     return {
        //         ...state,
        //         isLoggedIn: false,
        //         adminInfo: null
        //     }
        case actionTypes.FETCH_GENDER_START:
            let copy1 = { ...state };
            copy1.isLoadingGenders = true;
            return {...copy1}
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGenders = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGenders = false;
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_START:
            let copy2 = { ...state };
            copy2.isLoadingGenders = true;
            return {
                ...copy2,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_START:
            let copy3 = { ...state };
            copy3.isLoadingGenders = true;
            return {
                ...copy3,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roleIds = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roleIds = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            state.clinics = action.clinics;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CLINIC_FAILED:
            state.clinics = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            state.specialties = action.specialties;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
            state.specialties = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_HANDBOOK_SUCCESS:
            state.handbooks = action.handbooks;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_HANDBOOK_FAILED:
            state.handbooks = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_BOOKING_SUCCESS:
            state.bookings = action.bookings;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_BOOKING_FAILED:
            state.bookings = [];
            return {
                ...state,
            }
        // case actionTypes.FETCH_BOOKING_PATIENT_SUCCESS:
        //     state.patientBookings = action.patientBookings;
        //     return {
        //         ...state,
        //     }
        // case actionTypes.FETCH_BOOKING_PATIENT_FAILED:
        //     state.patientBookings = [];
        //     return {
        //         ...state,
        //     }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_DOCTOR_SUCCESS:
            state.doctor = action.dataDoctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_DOCTOR_FAILED:
            state.doctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDocs;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;