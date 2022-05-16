import axios from "axios";
const muatations = {
    getMetadata(state) {
        state.customers = axios({
            method: 'get',
            url: 'https://ahasoft-sample-apis.azurewebsites.net/Customer',
        }).then(function (res) {
            console.log(res.data);
        }) 
    }
}

export default muatations;