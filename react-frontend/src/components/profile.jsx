import React from 'react';
import '../bootstrap.min.css';
import { Checkbox, Switch, Space, Col, Row, Radio, Divider} from 'antd';

export default class Profile extends React.Component{

    constructor(props){
        super(props);
        this.categoryOptions = [
            { label: 'Chinese', value: 'Chinese' },
            { label: 'Asian Fusion', value: 'Asian Fusion' },
            { label: 'Seafood', value: 'Seafood' },
            { label: 'Sushi Bars', value: 'Sushi Bars' },
            { label: 'Pizza', value: 'Pizza' },
            { label: 'Burger', value: 'Burgers' },
            { label: 'Hotdog', value: 'Hot Dogs' },
            { label: 'Wine & Spirits', value: 'Wine & Spirits' },
            { label: 'Tacos', value: 'Tacos' },
            { label: 'Chicken Wings', value:'Chicken Wings'},
            { label: 'Sandwiches', value:'Sandwiches'},

          ];
          this.PriceRangeOptions = [
            { label: '$', value: '1' },
            { label: '$$', value: '2' },
            { label: '$$$', value: '3' },
          ];
    }

    render(){
        return(
            <div>
            <div className="container-fluid">
            <h3 className="text-dark mb-4">UserProfile</h3>
            <div className="row mb-3">
                <div className="row">
                  <div className="col">
                    <div className="card shadow mb-3">
                      <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">Preferences</p>
                      </div>
                      <div className="card-body">
                        <form>
                         <Row>
                             
                            <Col span={12}>
                                <Space direction='vertical'>
                                    <label className="form-label" htmlFor="Caregory"><strong>Category</strong></label>
                                    <Checkbox.Group id='category'options={this.categoryOptions} defaultValue={[]} onChange={() => console.log("Category changed")} />
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space direction='vertical'>
                                    <label className="form-label" htmlFor="Alcohol"><strong>Alcohol</strong></label>
                                    <Radio.Group onChange={() => console.log("Alcohol changed")} defaultValue={"u'full_bar'"}>
                                    <Radio value={"u'full_bar'"}>FullBar</Radio>
                                    <Radio value={"'beer_and_wine'"}>BeerandWine</Radio>
                                    <Radio value={'None'}>None</Radio>
                                    </Radio.Group>
                                </Space>
                            </Col>
                            <Col span={6}>
                            <Space direction='vertical'>
                                    <label className="form-label" htmlFor="Wifi"><strong>Wifi</strong></label>
                                    <Radio.Group onChange={() => console.log("Wifi changed")} defaultValue={"u'free'"}>
                                    <Radio value={"u'free'"}>Free</Radio>
                                    <Radio value={"u'no'"}>NotFree</Radio>
                                    </Radio.Group>
                                </Space>
                            </Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Col span={6}>
                              <Space direction="vertical">
                                  <label className="form-label" htmlFor="BikePark"><strong>Bike Parking</strong></label>
                              <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={() => console.log("BikePark changed") }defaultUnChecked/>
                              </Space>
                            </Col>
                            <Col span={6}>
                              <Space direction="vertical">
                                  <label className="form-label" htmlFor="CreditCard"><strong>CreditCard Accepted</strong></label>
                              <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={() => console.log("CreditCard changed")} defaultUnChecked/>
                              </Space>
                            </Col>
                            <Col span={6}>
                              <Space direction="vertical">
                                  <label className="form-label" htmlFor="GoodForKids"><strong>GoodForKids</strong></label>
                              <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={() => console.log("GoodForKids changed")} defaultUnChecked/>
                              </Space>
                            </Col>
                            <Col span={6}>
                              <Space direction="vertical">
                                  <label className="form-label" htmlFor="RestaurantsReservations"><strong>RestaurantsReservations</strong></label>
                              <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={() => console.log("ReservationAccepted changed")} defaultUnChecked/>
                              </Space>
                            </Col>
                            
                          </Row>
                          <Divider/>
                          <Row>
                            <Col span={6}>
                              <Space direction="vertical">
                                  <label className="form-label" htmlFor="Smoking"><strong>Smoking</strong></label>
                              <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={() => console.log("Smoking changed")} defaultUnChecked/>
                              </Space>
                            </Col>
                            <Col span={6}>
                              <Space direction="vertical">
                                  <label className="form-label" htmlFor="CoatChecking"><strong>CoatChecking</strong></label>
                              <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={() => console.log("CoatChecking changed")} defaultUnChecked/>
                              </Space>
                            </Col>
                            <Col span={6}>
                              <Space direction="vertical">
                                  <label className="form-label" htmlFor="OutdoorSeating"><strong>OutdoorSeating</strong></label>
                              <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={() => console.log("OutdoorSeating changed")} defaultUnChecked/>
                              </Space>
                            </Col>
                            <Col span={6}>
                                <Space direction='vertical'>
                                    <label className="form-label" htmlFor="Caregory"><strong>PriceRange</strong></label>
                                    <Checkbox.Group id='category'options={this.PriceRangeOptions} defaultValue={[]} onChange={() => console.log("Price Range changed")} />
                                </Space>
                            </Col>
                          </Row>
                          <Divider/>
                          <br></br>
                          <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit">Save Settings</button></div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow mb-5" />
          </div>
        );
    }
    

}