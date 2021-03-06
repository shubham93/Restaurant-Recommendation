import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Checkbox, Divider, Radio, Space, Switch } from "antd";

function ProfileAgent() {
  const userId = localStorage.getItem("user_id");
  const [alcohol_present, setAlcohol] = useState("None");
  const [wifi, setWifi] = useState(false);
  const [bike, setBike] = useState(false);
  const [creditCard, setCreditCard] = useState(false);
  const [kid, setKid] = useState(false);
  const [reservation, setReservation] = useState(false);
  const [smoke, setSmoke] = useState(false);
  const [coat, setCoat] = useState(false);
  const [outdoor, setOutdoor] = useState(false);
  const [price, setPrice] = useState(1);
  const [profileId, setProfileId] = useState(null);

  async function handleRequest() {
    let requestType = "POST";
    if (profileId !== null && profileId !== undefined) {
      requestType = "PUT";
    }
    const _response = await fetch(`http://127.0.0.1:5000/profile/${userId}`, {
      method: requestType,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        alcohol_present: alcohol_present,
        free_wifi_present: wifi,
        accepts_credit_cards: creditCard,
        bike_parking: bike,
        good_for_kids: kid,
        restaurant_reservation: reservation,
        outdoor_seating: outdoor,
        smoking: smoke,
        coat_check: coat,
        price_range: price,
      }),
    });
    const data = await _response.json();
    console.log("Response:", data);
    console.log("Status", _response.status);
    return { data: data, status: _response.status };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const _response = await handleRequest();

    if (_response["status"] == 200) {
      alert("Profile updated!");
    } else {
      alert("Update Failed!");
    }
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/profile/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileState(data);
      });
  }, []);

  function setProfileState(data) {
    setAlcohol(data["alcohol_present"] || "None");
    setWifi(data["free_wifi_present"] || false);
    setCreditCard(data["accepts_credit_cards"] || false);
    setBike(data["bike_parking"] || false);
    setKid(data["good_for_kids"] || false);
    setReservation(data["restaurant_reservation"] || false);
    setOutdoor(data["outdoor_seating"] || false);
    setSmoke(data["smoking"] || false);
    setCoat(data["coat_check"] || false);
    setPrice(data["price_range"] || 1);
    setProfileId(data["id"] || null);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Row>
          {/*<Col span={12}>*/}
          {/*    <Space direction='vertical'>*/}
          {/*        <label className="form-label" htmlFor="Caregory"><strong>Category</strong></label>*/}
          {/*        <Checkbox.Group id='category'options={this.categoryOptions} defaultValue={[]} onChange={() => console.log("Category changed")} />*/}
          {/*    </Space>*/}
          {/*</Col>*/}
          <Col span={12}>
            <Space direction="vertical">
              <label className="form-label" htmlFor="Alcohol">
                <strong>Alcohol</strong>
              </label>
              <Radio.Group
                onChange={(e) => {
                  console.log("Alcohol changed");
                  setAlcohol(e.target.value);
                }}
                defaultValue={"full_bar'"}
                value={alcohol_present}
              >
                <Radio value={"full_bar'"}>Full Bar</Radio>
                <Radio value={"beer_and_wine"}>Beer and Wine</Radio>
                <Radio value={"None"}>None</Radio>
              </Radio.Group>
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical">
              <label className="form-label" htmlFor="Wifi">
                <strong>Wifi</strong>
              </label>
              <Radio.Group
                onChange={(e) => {
                  console.log("Wifi changed");
                  setWifi(e.target.value);
                }}
                defaultValue={1}
                value={wifi}
              >
                <Radio value={true}>Paid</Radio>
                <Radio value={false}>Free</Radio>
              </Radio.Group>
            </Space>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={6}>
            <Space direction="vertical">
              <label className="form-label" htmlFor="BikePark">
                <strong>Bike Parking</strong>
              </label>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                onChange={(e) => {
                  console.log("BikePark changed");
                  setBike(e);
                }}
                checked={bike}
              />
            </Space>
          </Col>
          <Col span={6}>
            <Space direction="vertical">
              <label className="form-label" htmlFor="CreditCard">
                <strong>CreditCard Accepted</strong>
              </label>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                checked={creditCard}
                onChange={(e) => {
                  console.log("CreditCard changed");
                  setCreditCard(e);
                }}
              />
            </Space>
          </Col>
          <Col span={6}>
            <Space direction="vertical">
              <label className="form-label" htmlFor="GoodForKids">
                <strong>GoodForKids</strong>
              </label>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                onChange={(e) => {
                  console.log("GoodForKids changed");
                  setKid(e);
                }}
                checked={kid}
              />
            </Space>
          </Col>
          <Col span={6}>
            <Space direction="vertical">
              <label className="form-label" htmlFor="RestaurantsReservations">
                <strong>RestaurantsReservations</strong>
              </label>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                onChange={(e) => {
                  console.log("ReservationAccepted changed");
                  setReservation(e);
                }}
                checked={reservation}
              />
            </Space>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={6}>
            <Space direction="vertical">
              <label className="form-label" htmlFor="Smoking">
                <strong>Smoking</strong>
              </label>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                onChange={(e) => {
                  console.log("Smoking changed");
                  setSmoke(e);
                }}
                checked={smoke}
              />
            </Space>
          </Col>
          <Col span={6}>
            <Space direction="vertical">
              <label className="form-label" htmlFor="CoatChecking">
                <strong>CoatChecking</strong>
              </label>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                onChange={(e) => {
                  console.log("CoatChecking changed");
                  setCoat(e);
                }}
                checked={coat}
              />
            </Space>
          </Col>
          <Col span={6}>
            <Space direction="vertical">
              <label className="form-label" htmlFor="OutdoorSeating">
                <strong>OutdoorSeating</strong>
              </label>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                onChange={(e) => {
                  console.log("OutdoorSeating changed");
                  setOutdoor(e);
                }}
                checked={outdoor}
              />
            </Space>
          </Col>
          <Col span={6}>
            <Space direction="vertical">
              <label className="form-label" htmlFor="Caregory">
                <strong>PriceRange</strong>
              </label>
              <Radio.Group
                id="category"
                value={price}
                onChange={(e) => {
                  console.log("Price Range changed");
                  setPrice(e.target.value);
                }}
              >
                <Radio value={1}>$</Radio>
                <Radio value={2}>$$</Radio>
                <Radio value={3}>$$$</Radio>
              </Radio.Group>
            </Space>
          </Col>
        </Row>
        <Divider />
        <br></br>
        <div className="mb-3">
          <button className="btn btn-primary btn-sm" type="submit">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileAgent;
