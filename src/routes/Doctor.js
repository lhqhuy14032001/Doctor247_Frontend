import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import DoctorManageSchedule from '../containers/Patient/Doctor/DoctorManageSchedule';
import Header from '../containers/Header/Header';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import ManageSchedule from '../containers/Patient/Doctor/ManageSchedule';
import Page_404 from '../containers/404/404'


class Doctor extends Component {
    // PROPS stands for properties and is being used for passing data from one component to another.
    // But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)

    //để lưu giá trị của 1 biến components, ta dùng state
    //Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.


    render() {
        const { isLoggedIn } = this.props;

        //khi muốn render ra 1 thứ gì đó trong react, chúng ta phải có hàm return, và trong đó bắt buộc là 1 khối


        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="container system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/doctor-manage-schedule" component={ManageSchedule} />
                            <Route path="/doctor/manage-patient" component={ManagePatient} />
                            <Route path="*" component={Page_404} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>



        );
    }

}

const mapStateToProps = state => {
    return {
        // language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
