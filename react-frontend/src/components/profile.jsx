import React from 'react';
import '../bootstrap.min.css';
import { Checkbox, Switch, Space, Col, Row, Radio, Divider} from 'antd';
import ProfileAgent from "../ProfileAgent";

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
                          <ProfileAgent/>
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