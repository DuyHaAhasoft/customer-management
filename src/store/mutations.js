import axios from "axios";
const muatations = {
    async getDataCustomer(state) {
        try {
            const res = await axios.get('https://ahasoft-sample-apis.azurewebsites.net/Customer');
            state.customer = res.data;

        } catch(error) {
            alert(error);
        }
    }
}

export default muatations;