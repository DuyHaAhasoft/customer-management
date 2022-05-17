<template>
    <div v-if="show" class="confirm-delete">
        <div class="box confirm-delete__box">
            <div class="confirm-delete__body">
                <h4 class="confirm-delete__title">CONFIRM</h4>

                <div class="confirm-delete__text">{{ confirmText }}</div>
            </div>
            <div class="confirm-delete__footer">
                <b-button variant="success" class="confirm-delete__btn confirm-delete__btn--confirm" @click="$emit('confirm')">Delete</b-button>
                <b-button variant="danger" class="confirm-delete__btn confirm-delete__btn--cancel" @click="$emit('cancel')">Cancel</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        id: {
            type: Number,
            default: 0
        },
    },

    data() {
        return {}
    },

    computed: {
        confirmText() {
            return `Do you want to delete customer ${this.id}?`
        }
    },

    methods: {

    }
}
</script>

<style lang="scss" scoped>
@import './confirm-delete.scss';
</style>