<script>
import { mapActions } from 'pinia';
import indexStore from '../stores/indexStore.js';
export default {
    methods: {
        ...mapActions(indexStore, ["updateLocation"])
    },
    mounted() {
        this.updateLocation(2)
    }
}
</script>

<template>
    <div>
        <h2>back</h2>
    </div>
</template>

<style>
</style>