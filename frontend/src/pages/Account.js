import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import BuildingList from '../components/Buildings/BuildingList/BuildingList';
import AuthContext from '../context/auth-context';
import Spinner from '../components/Spinner/Spinner';


class AccountPage extends Component {
    state = {
        creating: false,
        buildings: [],
        selectedBuilding: null
    }

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.addressElRef = React.createRef();
        this.cityElRef = React.createRef();
        this.provinceElRef = React.createRef();
    }

    componentDidMount() {
        this.fetchBuildings();
    }

    startAddBuildingHandler = () => {
        this.setState({creating: true});
    }

    modalConfirmHandler = () => {
        this.setState({creating: false});
        const address = this.addressElRef.current.value;
        const city = this.cityElRef.current.value;
        const province = this.provinceElRef.current.value;

        if (address.trim().length === 0 || city.trim().length === 0 || province.trim().length === 0){
            return;
        }

        const requestBody = {
            query: `
                mutation {
                    addBuilding(buildingInput: {address: "${address}", city: "${city}", province: "${province}"}) {
                        _id
                        address
                        city
                        province
                    }
                }
            `
        };  
        const token = this.context.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            this.setState(prevState => {
                const updatedBuilding = {
                    _id: resData.data.addBuilding._id,
                    address: resData.data.addBuilding.address,
                    city: resData.data.addBuilding.city,
                    province: resData.data.addBuilding.province
                };
                const updatedBuildings = [...prevState.buildings];
                updatedBuildings.push(updatedBuilding);
                return{
                    selectedBuilding: updatedBuilding,
                    buildings: updatedBuildings
                }
            });
        })
        .catch(err => {
            console.log(err);
        });
    };

    modalCancelHandler = () => {
        this.setState({creating: false});
    };

    fetchBuildings() {
        this.setState({isLoading: true})
        const requestBody = {
            query: `
                query {
                    buildings {
                        _id
                        address
                        city
                        province
                    }
                }
            `
        };  

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            const buildings = resData.data.buildings;
            this.setState({buildings: buildings, isLoading: false});
        })
        .catch(err => {
            console.log(err);
            this.setState({isLoading: false});
        });
    }
    render() {
        return (
            <React.Fragment>
                {(this.state.creating) && <Backdrop />}
                {this.state.creating && 
                <Modal
                    title="Add a new building"
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmHandler}
                    confirmText="Add"
                >
                    <form>
                        <div className="form-control">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" ref={this.addressElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" ref={this.cityElRef}></input>
                        </div>
                        <div className="form-control">
                            <label htmlFor="Province">Province</label>
                            <select id="province" name="province" ref={this.provinceElRef}>
                                <option value="alberta">Alberta</option>
                                <option value="british-columbia">British Columbia</option>
                                <option value="manitoba">Manitoba</option>
                                <option value="new-brunswick">New Brunswick</option>
                                <option value="newfonudland">Newfoundland</option>
                                <option value="nova-scotia">Nova-Scotia</option>
                                <option value="ontario">Ontario</option>
                                <option value="pei">Prince Edward Island</option>
                                <option value="quebec">Quebec</option>
                                <option value="saskatchewan">Saskatchewan</option>
                                <option value="nwt">Northwest Territories</option>
                                <option value="nunavut">Nunavut</option>
                                <option value="yukon">Yukon</option>
                            </select>
                        </div>
                    </form>
                </Modal>
                }
                {this.context.token && 
                <div className="action-control">
                    <p>Add a new building</p>
                    <button className="btn" onClick={this.startAddBuildingHandler}>Add building</button>
                </div>
                }
                {this.state.isLoading ? 
                <Spinner /> : 
                    <BuildingList 
                    buildings={this.state.buildings} 
                />
                }
            </React.Fragment>
        )
    }
}

export default AccountPage;