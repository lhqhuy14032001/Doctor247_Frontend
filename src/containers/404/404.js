import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage'
import './404.scss'
class page404 extends Component {

    render() {
        return (
            <>
                <section class="page_404">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 ">
                                <div class="col-sm-10 col-sm-offset-1 text-center mx-auto mt-5 pt-5">
                                    <div class="four_zero_four_bg">
                                        <h1 class="text-center ">404</h1>


                                    </div>

                                    <div class="contant_box_404">
                                        <h3 class="h2">
                                            Look like you're lost
                                        </h3>

                                        <p>the page you are looking for not avaible!</p>

                                        {/* <a className='link_404'>Go to Home</a> */}
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(page404);
