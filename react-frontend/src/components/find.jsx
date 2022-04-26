import React from "react";
import { Rate, Table, Modal } from "antd";
import { Row, Col } from "antd";
import "antd/dist/antd.min.css";
import "../bootstrap.min.css";

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
          name:"Restaurant 1",
          location:"somewhere",
          star:5,
          info:"here is the info of rest #1"
        },
        {
          key:2,
          name:"Restaurant 2",
          location:"somewhere",
          star:4,
          info:"here is the info of rest #2"
        },
        {
          key:3,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          info:"here is the info of rest #3"
        },
        {
          key:4,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          info:"here is the info of rest #3"
        },
        {
          key:5,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          info:"here is the info of rest #3"
        },
        {
          key:6,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          info:"here is the info of rest #3"
        },
        {
          key:7,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          info:"here is the info of rest #3"
        },
        {
          key:8,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          info:"here is the info of rest #3"
        },
        {
          key:9,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          info:"here is the info of rest #3"
        },
        {
          key:10,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          info:"here is the info of rest #3"},
        {
          key:11,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          info:"here is the info of rest #3"},
        
        {
          key:12,
          name:"Restaurant 3",
          location:"somewhere",
          star:3,
          info:"here is the info of rest #3"},
        ],
        
      selectedRest : null,
      detailModalVisible  : true
    };
    this.showDetail = this.showDetail.bind(this);
  }

  async componentDidMount() {
    const results = await fetch("http://127.0.0.1:5000/restaurants/list/1");
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
            <p>{this.state.selectedRest.info}</p>
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
