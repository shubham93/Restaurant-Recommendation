import React from 'react';
import '../bootstrap.min.css';
import {Col,Row,Divider} from 'antd';

export default class Homepage extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
        <div className="container-fluid">
          <h3 className="text-dark mb-1" />
        </div>
        <div className="container py-4 py-xl-5">
          <Row>
            <Col span={10}><img className="rounded w-100 h-100 fit-cover" style={{Height: '150px'}} src="https://pic.imgdb.cn/item/625ffd9a239250f7c543db4c.jpg" /></Col>
            <Col span={2}></Col>
            <Col span={10}>
              <div className="text-center text-md-start d-flex flex-column align-items-center align-items-md-start mb-5">
                  <h4>Title</h4>
                  <p>Erat netus est hendrerit, nullam et quis ad cras porttitor iaculis. Bibendum vulputate cras aenean.</p>
              </div>
              <Divider/>
              <div className="text-center text-md-start d-flex flex-column align-items-center align-items-md-start mb-5">
                <div>
                  <h4>Title</h4>
                  <p>Erat netus est hendrerit, nullam et quis ad cras porttitor iaculis. Bibendum vulputate cras aenean.</p>
                </div>
              </div>
              <Divider/>
              <div className="text-center text-md-start d-flex flex-column align-items-center align-items-md-start">
                <div>
                  <h4>Title</h4>
                  <p>Erat netus est hendrerit, nullam et quis ad cras porttitor iaculis. Bibendum vulputate cras aenean.</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
        )
    }
    

}