import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import DoctorManageSchedule from './DoctorManageSchedule';
// import LikeAndShare from '../SocialPlugin/LikeAndShare';
// import Comment from '../SocialPlugin/Comment';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            //nếu props này match với database ở trong api, và match vs db có tham số, và match vs tham số tồn tại ở db đó(id)
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id);

            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
                // console.log(res.data);
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { language } = this.props;
        let { detailDoctor } = this.state;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
        }
        // console.log('check lang', language);
        // let currentURL = process.env.REACT_APP_IS_LOCALHOST == true
        // ? "https://eric-restaurant-bot-tv.herokuapp.com/" :window.location.href;
        return (
            <>
                {/* <HomeHeader
                    isShowBanner={false} /> */}
                <div className="container doctor-detail-container p-5">
                    <div className='row'>
                        <div className="intro-doctor col-12">
                            <div className="content-left col-1"
                                style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>
                            </div>
                            <div className="content-right col-11">
                                <div className="up">
                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                </div>
                                <div className="down">
                                    {detailDoctor && detailDoctor.Markdown
                                        && detailDoctor.Markdown.description &&
                                        <span>
                                            {detailDoctor.Markdown.description}
                                        </span>}
                                </div>
                            </div>
                        </div>
                        <div className="schedule-doctor col-12">
                            <div className="content-left">
                                <DoctorSchedule
                                    doctorIdFromParent={this.state.currentDoctorId}
                                />
                            </div>
                            <div className="content-right mx-auto">
                                <div className='content-right-item'>
                                    <DoctorExtraInfor doctorIdFromParent={this.state.currentDoctorId} />
                                </div>

                            </div>
                        </div>
                        <div className="detail-infor-doctor py-3 col-12">
                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                                &&
                                <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);