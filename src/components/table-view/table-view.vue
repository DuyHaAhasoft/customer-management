<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="field in fields" :key="field.text" class="">{{field.text}}</th>
                <th class="">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="element in data" :key="element.id">
                <td v-for="field in fields" :key="field.text">{{element[`${field.text.toLowerCase()}`]}}</td>
                <td class="table__table-data">
                <b-button variant="info">Info</b-button>
                <router-link :to="{name: 'edit-customer', params: {id: element.id}}">
                  <b-button variant="outline-primary">
                    Edit
                  </b-button>
                </router-link>
                <b-button variant="danger" @click="handleDeleteCustomerClick(element.id)">
                  Delete
                </b-button>
              </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        fields: {
            type: Object,
            default: function () {
                return {}
            },
            require: true,
        },
        data: {
            type: Array,
            default: function () {
                return []
            },
            require: true,
        },
        buttons: {
            type: Object,
            default:  function () {
                return {
                    view: {text: "", isShow: false},
                    edit: {text: "", field: "", routeName: "", isShow: false},
                    delete: {text: "", field: "", isShow: false}
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "./table-view.scss";
</style>