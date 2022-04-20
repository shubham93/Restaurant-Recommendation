import React from 'react';
import '../bootstrap.min.css';

export default class AboutUs extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <div className="container py-4 py-xl-5">
    <div className="row mb-4 mb-lg-5">
        <div className="col-md-8 col-xl-6 text-center mx-auto">
            <h2>Our Team</h2>
            <p className="w-lg-50"></p>
        </div>
    </div>
    <div className="row gy-4 row-cols-2 row-cols-md-4">
        <div className="col-lg-2">
            <div className="card border-0 shadow-none">
                <div className="card-body text-center d-flex flex-column align-items-center p-0">
                    <h6 className="fw-bold text-primary card-title mb-0">Yi Dou<br /></h6>
                    <p className="text-muted card-text mb-2">Student No:21357822</p>
                </div>
            </div>
        </div>
        <div className="col-lg-2">
            <div className="card border-0 shadow-none">
                <div className="card-body text-center d-flex flex-column align-items-center p-0">
                    <h6 className="fw-bold text-primary card-title mb-0">Rohan Girotra<br /></h6>
                    <p className="text-muted card-text mb-2">Student No:20304712</p>
                </div>
            </div>
        </div>
        <div className="col-lg-2">
            <div className="card border-0 shadow-none">
                <div className="card-body text-center d-flex flex-column align-items-center p-0">
                    <h6 className="fw-bold text-primary card-title mb-0">Bo Peng<br /></h6>
                    <p className="text-muted card-text mb-2">Student No:21333774</p>
                </div>
            </div>
        </div>
        <div classNameName="col-lg-2">
            <div className="card border-0 shadow-none">
                <div className="card-body text-center d-flex flex-column align-items-center p-0">
                    <h6 className="fw-bold text-primary card-title mb-0">Shubham Uniyal<br /></h6>
                    <p className="text-muted card-text mb-2">Student No:19303325</p>
                </div>
            </div>
        </div>

        <div className="col-lg-3">
            <div className="card border-0 shadow-none">
                <div className="card-body text-center d-flex flex-column align-items-center p-0">
                    <h6 className="fw-bold text-primary card-title mb-0">Vishnu Priya Uppalapati<br /></h6>
                    <p className="text-muted card-text mb-2">Student No:21336986</p>
                </div>
            </div>
        </div>
        <div className="col-lg-2"></div>
    </div>
</div>
            </div>
        )
    }
    

}