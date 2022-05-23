<template>
  <div class="list-customers-page">
    <div class="list-customers-page__content">
      <div class="list-customers-page__header">
        <h1 class="list-customers-page__title">List customers</h1>
        <b-button
          variant="warning"
          @click="handleShowFormAddCustomer('Add')"
          class="list-customers-page__btn list-customers-page--add"
        >
          Add
        </b-button>
      </div>
        <!-- <info-customer class="list-customers list-customers__info-customer" /> -->
        
      <div class="list-customers-page__body">
        <table-view-modal 
          v-if="dataTable.data"
          :data="dataTable.data" 
          :fields="dataTable.fields" 
          :action="dataTable.action" 
          @delete="handleDeleteCustomerClick"  
        >
          <template #id="row">
            <span>ID: {{ row.id }}</span>
          </template>

          <template #address="row">
            <span>Address: {{ row.address }}</span>
          </template>

          <template #balance="row">
            {{ formatBalance(row.balance) }}
          </template>
        </table-view-modal>
      </div>

      <div class="list-customers-page__footer">
        Pagination
      </div>
    </div>

    <modal-add
      :isShow="isShowAddCustomer"
      :nameForm="nameForm"
      @handleShowForm="handleShowFormAddCustomer"
    />

    <confirm-delete
      :id="confirmDelete.idCustomer" 
      :show="confirmDelete.status"
      class="list-customers__confirm-delete"
      
      @cancel="handleCancelDeleteClick"
      @confirm="handleConfirmDeleteClick"
    />
  </div>
</template>

<script>
// vue slot 

// Utilities
import axios from "axios";
import { mapActions } from "vuex";

// Components
// import InfoCustomer from "../info-customer/info-customer.vue"
import ModalAdd from '../modal-add/modal-add.vue';
import TableViewModal from '..//table-view-modal/table-view-modal.vue';
import ConfirmDelete from '../comfirm-delete/confirm-delete.vue';

export default {
  data() {
    return {
      customers: null,
      nameForm: "Add",
      confirmDelete: {
        status: false,
        idCustomer: null,
      },
      dataTable: {
        data: [],
        action: {
          view: {
            text: "Info",
            isShow: true
          },
          edit: {
            field: "id",
            text: "Edit",
            isShow: true,
            routeName: "edit-customer"
          },
          delete: {
            field: "id",
            isShow: true,
            text: "Delete",
          }
        },
        fields: {
          id: {text: "ID"},
          name: {text: "Name"},
          address: {text: "Address"},
          balance: {text: "Balance"}
        },
      },
      isShowAddCustomer: false,
    }
  },
  async mounted() {
    this.loadCustomers()
  },
  components: {
	// InfoCustomer,
  ModalAdd,
  TableViewModal,
	ConfirmDelete
  },
  created() {
    console.log("created");
    this.$store.dispatch('getDataCustomer');
    console.log("getDataCustomer")
  },
  methods: {
    ...mapActions(["getDataCustomer"]),
    handleDeleteCustomerClick(idCustomer) {
      this.confirmDelete.idCustomer = idCustomer;
      this.confirmDelete.status = true;
    },
    handleCancelDeleteClick() {
      this.confirmDelete.idCustomer = 0;
      this.confirmDelete.status = false;
    },
    async handleConfirmDeleteClick() {
      // this.deleteProduct(this.confirmDelete.idCustomer);
      try {
        const res = await axios.delete(`https://ahasoft-sample-apis.azurewebsites.net/Customer?id=${this.confirmDelete.idCustomer}`)

        if (res.status !== 200) {
          throw res.message
        }

        this.confirmDelete.idCustomer = 0;
        this.confirmDelete.status = false;

        this.loadCustomers()
      } catch(error) {
          alert(error);
      }
    },

    async loadCustomers() {
      const res = await axios.get('https://ahasoft-sample-apis.azurewebsites.net/Customer');
      this.customers = res.data;
      this.dataTable.data = res.data;
    },
    formatBalance(balance) {
      return `${balance * 2} VND`
    },
    handleShowFormAddCustomer(type = "Add") {
      this.nameForm = type;
      this.loadCustomers();
      this.isShowAddCustomer = !this.isShowAddCustomer;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "./list-customers.scss";
</style>
