import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import { saveBulkScheduleDoctor, getScheduleDoctorById } from '../../../services/userService';
import DetailDoctor from './DetailDoctor';
class DoctorManageSchedule extends Component {
    // PROPS stands for properties and is being used for passing data from one component to another.
    // But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)

    //để lưu giá trị của 1 biến components, ta dùng state
    //Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.
    constructor(props) {
        super(props);

        this.state = {
            arrDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
            minDate: moment().calendar(),

            //  detailDoctor: {},
            // currentDoctorId: -1,


        }
    }
    async componentDidMount() {
        this.props.fetchDoctor(this.props.match.params.id);

        this.props.fetchAllScheduleTimes();
    }
    // fetchDoctor(id) {
    //     this.props.fetchDoctorStart(id)
    //         .then(response => {
    //             this.setState({
    //                 doctor: response.data
    //             });
    //             console.log('data doctor',response.data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }  

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctor !== this.props.doctor) {
            let dataSelect = this.buildDataInputSelect(this.props.doctor)
            this.setState({
                arrDoctor: dataSelect
            })
        }
        // if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
        //     let dataSelect = await getScheduleDoctorById(this.props.doctorIdFromParent);
        //     if (dataSelect && dataSelect.errCode === 0) {
        //         this.setState({
        //             arrDoctor: dataSelect
        //         })
        //     }
        // }
        //Là để check xem khi API đã trả về dữ liệu rồi thì làm gì...
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        //chúng ta có thể đặt là inputData hoặc gì cũng ok, vì nó phụ thuộc vào props ở bên dưới
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelEn = `${item.lastName} ${item.firstName}`;
                let labelVi = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;

    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
            //thư viện date này sẽ trả về 1 array nhiều phần tử
            // nếu ta bấm liên tục nhiều lần, vì vậy date[0] là để lấy giá trị ngày đầu tiên trong array
        })
    }
    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Invalid date!");
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor! ");
            // console.log('check doctor: ', this.state)
            return;
        }

        let formatedDate = new Date(currentDate).getTime();


        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    // chúng ta thay schedule bằng cái gì cũng được, react tự hiểu đấy là 1 phần tử của arr đó
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error("Vui lòng chọn ngày hợp lệ! ");
                return;
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        })
        console.log('>>> Start check >>>')
        console.log(res)
        console.log('>>> End check >>>')
        if (res && res.errCode === 0) {
            toast.success("Save Infor succeed!");
        } else {
            toast.error("error saveBulkScheduleDoctor ");
            console.log('error saveBulkScheduleDoctor >>> res: ', res)
        }
    }
    render() {
        let { rangeTime, arrDoctor } = this.state;
        let { language } = this.props;
        let today = new Date(new Date().setDate(new Date().getDate()));
        //khi muốn render ra 1 thứ gì đó trong react, chúng ta phải có hàm return, và trong đó bắt buộc là 1 khối


        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title"></FormattedMessage>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" /> </label>

                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />

                        </div>
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" /> </label>
                            <DatePicker
                                value={this.state.currentDate}
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                minDate={today}
                            //minDate là để lấy ngày hiện tại
                            />

                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ?
                                            "btn btn-schedule active" : "btn btn-schedule"}
                                            key={index} onClick={() => this.handleClickBtnTime(item)}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary btn-save-schedule"
                                onClick={() => this.handleSaveSchedule()}>
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>



        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        doctor: state.admin.doctor,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctor: () => dispatch(actions.fetchDoctorStart()),
        fetchAllScheduleTimes: () => dispatch(actions.fetchAllScheduleTimes())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManageSchedule);
