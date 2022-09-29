<template>
    <modal name="popup">
        <div slot="top-right">
            <button @click="$modal.hide('popup')">
                ❌
            </button>
        </div>
        <h1>Hello, ☀️!</h1>
    </modal>
</template>

<script>
export default {
    name: "Modal",
    methods: {
        show () {
            this.$modal.show('popup');
        },
        hide () {
            this.$modal.hide('popup');
        }
    },
    mount () {
        this.show()
    }
}
</script>