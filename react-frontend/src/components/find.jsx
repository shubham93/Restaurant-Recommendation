import React from "react";
import { Rate, Table, Modal, Spin, Row, Col } from "antd";
import "antd/dist/antd.min.css";
import "../bootstrap.min.css";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

export default class Find extends React.Component {
  async showDetail(name) {
    const selectedRestaurant = this.state.restaurants.find(
      (data) => data.name == name
    );
    console.log("restaurant ", selectedRestaurant);
    const _response = await fetch(
      `http://127.0.0.1:5000/ratings/${this.userId}/${selectedRestaurant.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await _response.json();
    const rating = data.rating || 0;
    console.log("rating,", rating);
    selectedRestaurant.rating = rating;
    selectedRestaurant.isPersistedRatingPresent =
      data.id !== null && data.id !== undefined;
    this.setState({
      selectedRest: selectedRestaurant,
      detailModalVisible: true,
    });
  }

  userId = localStorage.getItem("user_id");

  columns = [
    {
      title: "Restaurant Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <a
          style={{ color: "#3b62d0" }}
          onClick={async () => this.showDetail(text)}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Location",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
    },
    {
      title: "Rating",
      dataIndex: "stars",
      key: "stars",
    },
  ];

  getMappedResults(results = []) {
    return results.map((restaurant) => {
      let restaurantInfo = { ...restaurant.attributes };
      restaurantInfo.id = restaurant.id;
      restaurantInfo.categories = restaurant.categories;
      restaurantInfo.name = restaurant.business_name;
      restaurantInfo.address = `${restaurant.business_address} ${restaurant.business_city}`;
      restaurantInfo.stars = restaurant.stars;
      return restaurantInfo;
    });
  }

  updateSelectedRestaurantRating(value) {
    const selectedRest = { ...this.state.selectedRest };
    selectedRest.rating = value;
    debugger;
    this.setState({ selectedRest: selectedRest });
  }

  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      selectedRest: null,
      detailModalVisible: true,
    };

    this.showDetail = this.showDetail.bind(this);
    this.updateSelectedRestaurantRating =
      this.updateSelectedRestaurantRating.bind(this);
    this.submitRatingForSelectedRest =
      this.submitRatingForSelectedRest.bind(this);
  }

  async componentDidMount() {
    const _response = await fetch(
      `http://127.0.0.1:5000/restaurants/list/${this.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await _response.json();
    const restaurantState = this.getMappedResults(data.results);
    this.setState({ restaurants: restaurantState });
  }

  async submitRatingForSelectedRest() {
    const selectedRestaurant = this.state.selectedRest;
    this.setState({ isRatingRequestInProgress: true });
    const rating = selectedRestaurant.rating;
    const requestType = selectedRestaurant.isPersistedRatingPresent
      ? "PUT"
      : "POST";
    const _response = await fetch(
      `http://127.0.0.1:5000/ratings/${this.userId}/${selectedRestaurant.id}`,
      {
        method: requestType,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
        }),
      }
    );
    const data = await _response.json();
    setInterval(() => {
      this.setState({ isRatingRequestInProgress: false });
    }, 1000);
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
              <Col>Business CreditCards Accepted: &nbsp;</Col>
              <Col>
                {this.state.selectedRest.BusinessAcceptsCreditCards ? (
                  <AiOutlineCheckCircle />
                ) : (
                  <AiOutlineCloseCircle />
                )}
              </Col>
            </Row>
            <Row>
              <Col>Alcohol Avaliable: &nbsp;</Col>
              <Col>
                {this.state.selectedRest.Alcohol === 0 && (
                  <AiOutlineCloseCircle />
                )}
                {this.state.selectedRest.Alcohol === 2 && "Full bar"}
                {this.state.selectedRest.Alcohol === 3 && "Bear and Wine"}
              </Col>
            </Row>
            <Row>
              <Col>Bike Parking Avaliable: &nbsp;</Col>
              <Col>
                {this.state.selectedRest.Bikeparking ? (
                  <AiOutlineCheckCircle />
                ) : (
                  <AiOutlineCloseCircle />
                )}
              </Col>
            </Row>
            <Row>
              <Col>Coat Check Avaliable: &nbsp;</Col>
              <Col>
                {this.state.selectedRest.CoatCheck ? (
                  <AiOutlineCheckCircle />
                ) : (
                  <AiOutlineCloseCircle />
                )}
              </Col>
            </Row>
            <Row>
              <Col>Wifi Avaliable: &nbsp;</Col>
              <Col>
                {this.state.selectedRest.Wifi ? (
                  <AiOutlineCheckCircle />
                ) : (
                  <AiOutlineCloseCircle />
                )}
              </Col>
            </Row>
            <Row>
              <Col>Good For Kids: &nbsp;</Col>
              <Col>
                {this.state.selectedRest.GoodForKids ? (
                  <AiOutlineCheckCircle />
                ) : (
                  <AiOutlineCloseCircle />
                )}
              </Col>
            </Row>
            <Row>
              <Col>Outdoor Seating Avaliable: &nbsp;</Col>
              <Col>
                {this.state.selectedRest.OutdoorSeating ? (
                  <AiOutlineCheckCircle />
                ) : (
                  <AiOutlineCloseCircle />
                )}
              </Col>
            </Row>
            <Row>
              <Col>Restaurants Price Range: &nbsp;</Col>
              <Col>
                {this.state.selectedRest.RestaurantsPriceRange2 === 1 && "$"}{" "}
                {this.state.selectedRest.RestaurantsPriceRange2 === 2 && "$$"}{" "}
                {this.state.selectedRest.RestaurantsPriceRange2 === 3 && "$$$"}
              </Col>
            </Row>
            <Row>
              <Col>Restaurants Reservations Avaliable: &nbsp;</Col>
              <Col>
                {this.state.selectedRest.RestaurantsReservations ? (
                  <AiOutlineCheckCircle />
                ) : (
                  <AiOutlineCloseCircle />
                )}
              </Col>
            </Row>
            <Row>
              <Col>Smoking Allowed: &nbsp;</Col>
              <Col>
                {this.state.selectedRest.Smoking ? (
                  <AiOutlineCheckCircle />
                ) : (
                  <AiOutlineCloseCircle />
                )}
              </Col>
            </Row>
            <Rate
              allowHalf
              defaultValue={0}
              value={this.state.selectedRest.rating}
              onChange={this.updateSelectedRestaurantRating}
            />
            <div class="d-flex justify-content-between">
              <button
                className=" d-block btn-primary btn-user w-20 h-10"
                type="submit"
                onClick={this.submitRatingForSelectedRest}
              >
                Submit
              </button>
              {this.state.isRatingRequestInProgress ? <Spin /> : <div></div>}
            </div>
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
                  {/*Table results here */}
                  <Table
                    columns={this.columns}
                    dataSource={this.state.restaurants}
                    pagination={{ defaultPageSize: 10 }}
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
