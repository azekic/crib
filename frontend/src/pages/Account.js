import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import BuildingList from '../components/Buildings/BuildingList/BuildingList';
import Unit from '../components/Unit/Unit';
import AuthContext from '../context/auth-context';
import Spinner from '../components/Spinner/Spinner';


class AccountPage extends Component {
    state = {
        creating: false,
        addingUnit: false,
        buildings: [],
        unit: null,
        isLoading: true,
        isLoadingBuildings: true
    }

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.addressElRef = React.createRef();
        this.cityElRef = React.createRef();
        this.provinceElRef = React.createRef();
        this.unitNumberElRef = React.createRef();
    }

    componentDidMount() {
        this.fetchBuildings();
        this.fetchUnit();
    }

    startAddBuildingHandler = () => {
        this.setState({creating: true});
    }

    startAddUnitHandler = () => {
        this.setState({addingUnit: true});
    }
    unitConfirmHandler = () => {
        this.setState({addingUnit: false, isLoading: true});
        const unitNumber = +this.unitNumberElRef.current.value;
        const buildingId = this.state.unit.building._id

        if (unitNumber <= 0 || buildingId == null){
            return;
        }

        const requestBody = {
            query: `
                mutation {
                    addUnit(unitInput: {unitNumber: ${unitNumber}, buildingId: "${buildingId}"}) {
                        _id
                        unitNumber
                        building {
                            _id
                            address
                            city
                            province
                        }
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
            const unit = resData.data.addUnit;
            this.setState({unit: unit, isLoading: false})
        })
        .catch(err => {
            console.log(err);
            this.setState({isLoading: false})
        });
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
        this.setState({isLoadingBuildings: true})
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
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            const buildings = resData.data.buildings;
            this.setState({buildings: buildings, isLoadingBuildings: false});
        })
        .catch(err => {
            console.log(err);
            this.setState({isLoadingBuildings: false});
        });
    }

    fetchUnit() {
        this.setState({isLoading: true})
        const requestBody = {
            query: `
                query {
                    unit {
                        _id
                        unitNumber
                        building {
                            _id
                            address
                            city
                            province
                        }
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
            const unit = resData.data.unit;
            this.setState({unit: unit, isLoading: false});
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
                {(this.state.addingUnit) && <Backdrop />}
                {this.state.addingUnit && 
                <Modal
                    title="Add your unit"
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.unitConfirmHandler}
                    confirmText="Add"
                >
                    <form>
                        <div className="form-control">
                            <label htmlFor="unitNumber">Unit Number</label>
                            <input type="number" id="unitNumber" ref={this.unitNumberElRef}></input>
                        </div>
                    </form>
                </Modal>
                }
                {this.state.isLoading ? 
                <Spinner /> : 
                <React.Fragment>
                    <div className="container">
                        <h2>General</h2>
                        <Unit 
                            unit={this.state.unit} 
                        />
                    </div>
                    </React.Fragment>

                }
                <div className="container action-control">
                    <h2>Enter your unit number</h2>
                    <button className="btn" onClick={this.startAddUnitHandler}>Add unit</button>
                </div>
                {this.context.token && 
                <div className="container action-control">
                    <h2>Choose a building</h2>
                    {this.state.isLoadingBuildings ? 
                    <Spinner /> : 
                    <BuildingList 
                            buildings={this.state.buildings} 
                        />
                        
                    }
                    <button className="btn" onClick={this.startAddBuildingHandler}>Add new building</button>
                </div>
                }
            </React.Fragment>
        )
    }
}

export default AccountPage;