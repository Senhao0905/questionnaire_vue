<script>
import { mapActions } from 'pinia';
import indexStore from '../stores/indexStore.js';
export default {
    methods: {
        ...mapActions(indexStore, ["updateLocation"])
    },
    mounted() {
        this.updateLocation(1)
    }
}

</script>

<template>
    <div>
        <h2>front</h2>
    </div>
</template>

<style></style>