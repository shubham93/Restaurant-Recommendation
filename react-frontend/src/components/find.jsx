import React from "react";
import { Rate, Table, Modal } from "antd";
import { Row, Col } from "antd";
import "antd/dist/antd.min.css";
import "../bootstrap.min.css";
import {useEffect, useState} from "react";
import { AiOutlineCloseCircle,AiOutlineCheckCircle} from "react-icons/ai";

export default class Find extends React.Component {
  showDetail(name) {
    this.state.result.forEach((element) => {
      if (element.name == name) {
        this.setState({ selectedRest: element, detailModalVisible: true });
      }
    });
  }

  columns = [
    {
      title: "Restaurant Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
          <a style={{ color: "#3b62d0" }} onClick={() => this.showDetail(text)}>
            {text}
          </a>
      ),
    },
    {
      title: "Position",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Star",
      dataIndex: "star",
      key: "star",
    },
  ];

  constructor(props) {
    super(props);
    // this.categoryOptions = [
    //   { label: "Cantonese Cuisine", value: "cc" },
    //   { label: "Indian Food", value: "if" },
    //   { label: "Fast Food", value: "ff" },
    //   { label: "Fast Food", value: "ff" },
    //   { label: "Fast Food", value: "ff" },
    //   { label: "Fast Food", value: "ff" },
    // ];

    // Restaurant Results here
    this.state = {
      result : [
        {
          key:1,
          name:"Restaurant 1",
          location:"somewhere",
          star:5,
          BusinessAcceptsCreditCards:true,
          Alcohol:"none",
          Bikeparking:false,
          CoatCheck:true,
          Wifi:true,
          GoodForKids:false,
          OutdoorSeating:true,
          RestaurantsPriceRange2:1,
          RestaurantsReservations:false,
          Smoking:false,
        },
        {
          key:2,
          name:"Restaurant 2",
          location:"somewhere",
          star:4,
          BusinessAcceptsCreditCards:false,
          Alcohol:"u'full_bar'",
          Bikeparking:false,
          CoatCheck:false,
          Wifi:true,
          GoodForKids:false,
          OutdoorSeating:false,
          RestaurantsPriceRange2:2,
          RestaurantsReservations:false,
          Smoking:false,
        },
        {
          key:3,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          BusinessAcceptsCreditCards:false,
          Alcohol:"none",
          Bikeparking:false,
          CoatCheck:false,
          Wifi:true,
          GoodForKids:false,
          OutdoorSeating:false,
          RestaurantsPriceRange2:1,
          RestaurantsReservations:false,
          Smoking:false,
        },
        {
          key:4,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          BusinessAcceptsCreditCards:false,
          Alcohol:"none",
          Bikeparking:false,
          CoatCheck:false,
          Wifi:true,
          GoodForKids:false,
          OutdoorSeating:false,
          RestaurantsPriceRange2:1,
          RestaurantsReservations:false,
          Smoking:false,
        },
        {
          key:5,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          BusinessAcceptsCreditCards:false,
          Alcohol:"none",
          Bikeparking:false,
          CoatCheck:false,
          Wifi:true,
          GoodForKids:false,
          OutdoorSeating:false,
          RestaurantsPriceRange2:1,
          RestaurantsReservations:false,
          Smoking:false,
        },
        {
          key:6,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          BusinessAcceptsCreditCards:false,
          Alcohol:"none",
          Bikeparking:false,
          CoatCheck:false,
          Wifi:true,
          GoodForKids:false,
          OutdoorSeating:false,
          RestaurantsPriceRange2:1,
          RestaurantsReservations:false,
          Smoking:false,
        },
        {
          key:7,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          BusinessAcceptsCreditCards:false,
          Alcohol:"none",
          Bikeparking:false,
          CoatCheck:false,
          Wifi:true,
          GoodForKids:false,
          OutdoorSeating:false,
          RestaurantsPriceRange2:1,
          RestaurantsReservations:false,
          Smoking:false,
        },
        {
          key:8,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          BusinessAcceptsCreditCards:false,
          Alcohol:"none",
          Bikeparking:false,
          CoatCheck:false,
          Wifi:true,
          GoodForKids:false,
          OutdoorSeating:false,
          RestaurantsPriceRange2:1,
          RestaurantsReservations:false,
          Smoking:false,
        },
        {
          key:9,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          BusinessAcceptsCreditCards:false,
          Alcohol:"none",
          Bikeparking:false,
          CoatCheck:false,
          Wifi:true,
          GoodForKids:false,
          OutdoorSeating:false,
          RestaurantsPriceRange2:1,
          RestaurantsReservations:false,
          Smoking:false,
        },
        {
          key:10,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          BusinessAcceptsCreditCards:false,
          Alcohol:"none",
          Bikeparking:false,
          CoatCheck:false,
          Wifi:true,
          GoodForKids:false,
          OutdoorSeating:false,
          RestaurantsPriceRange2:1,
          RestaurantsReservations:false,
          Smoking:false,
        },
        {
          key:11,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          BusinessAcceptsCreditCards:false,
          Alcohol:"none",
          Bikeparking:false,
          CoatCheck:false,
          Wifi:true,
          GoodForKids:false,
          OutdoorSeating:false,
          RestaurantsPriceRange2:1,
          RestaurantsReservations:false,
          Smoking:false,
        },

        {
          key:12,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          BusinessAcceptsCreditCards:false,
          Alcohol:"none",
          Bikeparking:false,
          CoatCheck:false,
          Wifi:true,
          GoodForKids:false,
          OutdoorSeating:false,
          RestaurantsPriceRange2:1,
          RestaurantsReservations:false,
          Smoking:false,
        },
      ],

      selectedRest : null,
      detailModalVisible  : true
    };

    this.showDetail = this.showDetail.bind(this);
  }

  async componentDidMount() {
    const _response = await fetch('http://127.0.0.1:5000/restaurants/', {
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    const data = await _response.json()
    console.log("Restaurant List:", data[1])
  }

  render() {

    return (
        <div>
          {this.state.selectedRest == null ? (
              <div />
          ) : (
              <Modal
                  title={this.state.selectedRest.name}
                  visible={this.state.detailModalVisible}
                  footer={null}
                  onCancel={() => {
                    this.setState({ detailModalVisible: false });
                  }}
              >
                <Row>
                  <Col>
                    Business CreditCards Accepted: &nbsp;
                  </Col>
                  <Col>
                    {this.state.selectedRest.BusinessAcceptsCreditCards?<AiOutlineCheckCircle />:<AiOutlineCloseCircle />}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Alcohol Avaliable: &nbsp;
                  </Col>
                  <Col>
                    {this.state.selectedRest.Alcohol==="none"&&<AiOutlineCloseCircle />}
                    {this.state.selectedRest.Alcohol==="u'full_bar'"&&"Full bar"}
                    {this.state.selectedRest.Alcohol==="'beer_and_wine''"&&"Bear and Wine"}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Bike Parking Avaliable: &nbsp;
                  </Col>
                  <Col>
                    {this.state.selectedRest.Bikeparking?<AiOutlineCheckCircle />:<AiOutlineCloseCircle />}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Coat Check Avaliable: &nbsp;
                  </Col>
                  <Col>
                    {this.state.selectedRest.CoatCheck?<AiOutlineCheckCircle />:<AiOutlineCloseCircle />}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Wifi Avaliable: &nbsp;
                  </Col>
                  <Col>
                    {this.state.selectedRest.Wifi?<AiOutlineCheckCircle />:<AiOutlineCloseCircle />}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Good For Kids: &nbsp;
                  </Col>
                  <Col>
                    {this.state.selectedRest.GoodForKids?<AiOutlineCheckCircle />:<AiOutlineCloseCircle />}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Outdoor Seating Avaliable: &nbsp;
                  </Col>
                  <Col>
                    {this.state.selectedRest.OutdoorSeating?<AiOutlineCheckCircle />:<AiOutlineCloseCircle />}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Restaurants Price Range: &nbsp;
                  </Col>
                  <Col>
                    {this.state.selectedRest.RestaurantsPriceRange2===1&&"$"} {this.state.selectedRest.RestaurantsPriceRange2===2&&"$$"} {this.state.selectedRest.RestaurantsPriceRange2===3&&"$$$"}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Restaurants Reservations Avaliable: &nbsp;
                  </Col>
                  <Col>
                    {this.state.selectedRest.RestaurantsReservations?<AiOutlineCheckCircle />:<AiOutlineCloseCircle />}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Smoking Allowed: &nbsp;
                  </Col>
                  <Col>
                    {this.state.selectedRest.Smoking?<AiOutlineCheckCircle />:<AiOutlineCloseCircle />}
                  </Col>
                </Row>
                {/* <p>BusinessAcceptsCreditCards<p>{this.state.selectedRest.BusinessAcceptsCreditCards}</p></p>
            <p>Alcohol<p>{this.state.selectedRest.Alcohol}</p></p>
            <p>Bikeparking<p>{this.state.selectedRest.Bikeparking}</p></p>
            <p>CoatCheck<p>{this.state.selectedRest.CoatCheck}</p></p>
            <p>Wifi<p>{this.state.selectedRest.Wifi}</p></p>
            <p>GoodForKids<p>{this.state.selectedRest.GoodForKids}</p></p>
            <p>OutdoorSeating<p>{this.state.selectedRest.OutdoorSeating}</p></p>
            <p>RestaurantsPriceRange2<p>{this.state.selectedRest.RestaurantsPriceRange2}</p></p>
            <p>RestaurantsReservations<p>{this.state.selectedRest.RestaurantsReservations}</p></p>
            <p>Smoking<p>{this.state.selectedRest.Smoking}</p></p> */}
                <Rate allowHalf defaultValue={2.5} />
                <button  className=" d-block btn-primary btn-user w-20 h-10" type="submit">Submit</button>
              </Modal>
          )}
          <div>
            <div>
              <meta charSet="utf-8" />
              <div className="container-fluid">
                <h3 className="text-dark mb-4">
                  Find the restaurant fits you best!
                </h3>
                <div className="card shadow">
                  <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">
                      Recommonded Restaurant List
                    </p>
                  </div>
                  <div className="card-body">
                    {/*Category and Search*/}
                    {/* <Row>
                      <Col span={16}>
                        <Space direction='vertical'>
                              <h6>Categoary: </h6><Checkbox.Group options={this.categoryOptions} defaultValue={[]} onChange={() => console.log("changed")} />
                          </Space></Col>
                      <Col span={8}>
                        <Space direction='vertical'><h6>Cuisine: </h6>
                            <Input.Search
                              placeholder="Input the cuisine name"
                              allowClear
                              enterButton="Search"
                              size="large"
                              onSearch={() => console.log("onSearch")}
                              />
                            </Space>
                      </Col>
                    </Row> */}
                    {/* Price Range, Car parking, Pet Friendly */}
                    {/* <Row>
                        <Col span={12} >
                          <h6>Price Range(€/per)</h6>
                          <Slider range defaultValue={[0, 150]}  min={0} max={150}/>
                        </Col>
                        <Col span={3} push={4} ><Space direction="vertical">
                        <h6>Car Park Needed </h6><Switch defaultChecked/></Space>
                        </Col>
                        <Col span={3}  push={4}><Space direction='vertical'><h6>Pet friendly</h6><Switch defaultChecked/></Space></Col>
                    </Row> */}

                    {/*Table results here */}
                    <Table
                        columns={this.columns}
                        dataSource={this.state.result}
                        pagination={{ defaultPageSize:10}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}