import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2';
import {ChartContainer} from '../../StorageAdminHome/styleChart'
import { getStorageById } from '../../api_config/api';
import { getInfo } from '../../helperMethods';

export default class CustomerChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Storage: null,
        };
    }

    componentDidMount() {
        //API call 
        getStorageById(getInfo().data.StorageId)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    Storage: response.data
                });
            })
            .catch((error) => {
            })

    }
    render() {
        let InStorage = 0
        let EmptySpace = 6000
        const {Storage}  = this.state
        if(Storage != null){
             InStorage = Storage.Storage.StorageArea 
        }
     const StorageData = {
         labels: [`In Storage : ${InStorage}`
             , `Empty Space: ${EmptySpace}`],
         datasets: [
             {
                 data: [InStorage, EmptySpace],
                 backgroundColor: [
                     'rgba(255, 0, 0, 0.6)',
                     'rgba(0, 0, 255, 0.6)',

                 ],

                 borderColor: [
                     'rgba(255, 0, 0, 0.9)',
                     'rgba(0, 0, 255, 0.9)',
                 ],
                 borderWidth: 1,
             },
         ],
     };
     return (
             <div className="chartBar">                 
                 <ChartContainer>
                     <div>
                         {InStorage === 0 && EmptySpace === 0 ? <div class="spinner">Loading...</div> : 
                         <Doughnut data={StorageData} />}
                     </div>
                 </ChartContainer>
         </div>
         
     )
 }
}
