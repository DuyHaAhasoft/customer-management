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
                <td 
                    :key="index"
                    class="table__table-data" 
                    v-for="(field, index) in Object.keys(fields)" 
                >
                    <slot name="address"></slot>
                    {{ element[field] }}
                </td>

                <td class="table__table-data">
                    <button v-if="action.view.isShow" class="table-data__btn table-data__btn--view">{{action.view.text}}</button>

                    <router-link :to="{name: action.edit.routeName, params: {id: action.edit.field}}">
                        <button v-if="action.edit.isShow" class="table-data__btn table-data__btn--edit">
                            {{ action.edit.text }}
                        </button>
                    </router-link>

                    <button 
                        v-if="action.delete.isShow" 
                        class="table-data__btn table-data__btn--delete"
                        @click="$emit('delete', element[action.delete.field])" 
                    >
                        {{ action.delete.text }}
                    </button>
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
    mounted() {
        //element[`${field.text.toLowerCase()}`]
        console.log("fields", Object.keys(this.fields));
    },
    props: {
        fields: {
            type: Object,
            require: true,
            default: function () {
                return {}
            },
        },
        data: {
            type: Array,
            require: true,
            default: function () {
                return []
            },
        },
        action: {
            type: Object,
            default:  function () {
                return {
                    view: {text: "Info", isShow: true},
                    delete: {text: "", field: "", isShow: false},
                    edit: {text: "Edit", field: "", routeName: "", isShow: true},
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    @import "./table-view.scss";
</style>