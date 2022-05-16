import listCustomers from '../components/list-customers/list-customers.vue';
import addCustomer from '../components/add-customer/add-customer.vue';
import notFound from "../components/not-found/not-found.vue";

const routes = [
    {path: '/', name: 'list-customers' , component: listCustomers},
    {path: '/add', name: 'add-customer' , component: addCustomer},
    {path: '/edit/:id', name: 'edit-customer' , component: addCustomer},
    {path: '*', name: 'not-found' , component: notFound}
]
export default routes;