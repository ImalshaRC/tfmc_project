import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class InventoryUpdateDeadSet extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeSKU = this.onChangeSKU.bind(this);
        this.onChangeDeadSet = this.onChangeDeadSet.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAvailableUnits = this.onChangeAvailableUnits.bind(this);
        this.onChangeUnitPrice = this.onChangeUnitPrice.bind(this);
        this.onChangeExpireDate = this.onChangeExpireDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          sku: '',
          dead_set:'',
          name: '',
          available_units: '',
          unit_price: '',
          expire_date: ''
        }
    
      }

      componentDidMount(){
        axios.get('http://localhost:5000/deadstock/get/'+this.props.match.params.id).then(res =>{
            this.setState({
              sku:res.data.deadstock.SKU,
              name:res.data.deadstock.Name,
              available_units:res.data.deadstock.Available_Units,
              unit_price:res.data.deadstock.Unit_Price,
              dead_set:res.data.deadstock.Dead_Set,
              expire_date:res.data.deadstock.Expire_Date
            });
            console.log(res.data);
        }).catch((error)=>{
          toast.warning("Error with fetching data", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        })
      }
    
      onChangeSKU(e) {
        this.setState({
          sku: e.target.value
        })
      }

      onChangeDeadSet(e){
        this.setState({
          dead_set: e.target.value
        })
      }
    
      onChangeName(e) {
        this.setState({
          name: e.target.value
        })
      }
    
      onChangeAvailableUnits(e) {
        this.setState({
          available_units: e.target.value
        })
      }

      onChangeUnitPrice(e) {
        this.setState({
          unit_price: e.target.value
        })
      }

      onChangeExpireDate(e){
        this.setState({
          expire_date: e.target.value
        })
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const {sku,name,dead_set,available_units,unit_price,expire_date} = this.state
        const deadset = {
          SKU: sku,
          Dead_Set: dead_set,
          Name: name,
          Available_Units: available_units,
          Unit_Price: unit_price,
          Expire_Date: expire_date
        }
    
        console.log(deadset);
    
        axios.put('http://localhost:5000/deadstock/edit/'+this.props.match.params.id, deadset).then(()=>{
          toast.success("Dead Stock Updated!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }).catch((err)=>{
          toast.error("Error with updating!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        })

      }

    render() {
        return (
                <div className="formBackground">
                    <div className="formContainer">
                        <div class="formHeader">
                            <button type="button" name="button" onClick={event =>  window.location.href='/inventorymanagement'}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </button>
                            <h2>Update Dead Set</h2>
                        </div>

                        <div class="formBody">
                            <form onSubmit={this.onSubmit}>
                                <table>
                                    <tr>
                                        <th>SKU</th>
                                        <th>Dead Set</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.sku} onChange={this.onChangeSKU} required /></td>
                                        <td><input type="text" value={this.state.dead_set} onChange={this.onChangeDeadSet} disabled /></td>
                                    </tr>
                                   
                                     <tr>
                                        <th colSpan="2">Name</th>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="colspanTd">
                                            <input type="text"style={{width: "90%"}} value={this.state.name} onChange={this.onChangeName} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Available Units</th>
                                        <th>Unit Price</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.available_units} onChange={this.onChangeAvailableUnits} /></td>
                                        <td><input type="text" value={this.state.unit_price} onChange={this.onChangeUnitPrice} /></td>
                                    </tr>
                                    <tr>
                                        <th>Expire Date</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="text" value={this.state.expire_date} onChange={this.onChangeExpireDate} required />
                                            </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><input type="submit" value="Submit" /></td>
                                    </tr>
                                </table>
                            </form>
                            <ToastContainer theme="dark"/>
                        </div>
                    </div>
                </div>
        );
    }

}

export default InventoryUpdateDeadSet;