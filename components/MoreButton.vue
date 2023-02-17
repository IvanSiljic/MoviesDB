<script setup>
    const { loadin } = defineProps(['loading'])
</script>

<template>
    <button class="button">
        <LoadSpinner v-if="loading" />
        {{ loading ? '' : 'Load More' }}
    </button>
</template>

<style scoped lang="scss">
    .button {
        display: flex;
        align-items: center;
        background-color: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: .25rem;
        box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 0.85);
        cursor: pointer;
        display: inline-flex;
        font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 16px;
        font-weight: 600;
        justify-content: center;
        line-height: 1.25;
        min-height: 3rem;
        height: 3.5rem;
        padding: calc(.875rem - 1px) calc(1.5rem - 1px);
        text-decoration: none;
        transition: all 250ms;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: baseline;
        width: auto;
    }
    .button:hover,
    .button:focus {
        border-color: rgba(0, 0, 0, 0.15);
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 15px;
        color: rgba(0, 0, 0, 0.65);
    }
    .button:hover {
        transform: translateY(-1px);
    }
    .button:active {
        background-color: #F0F0F1;
        border-color: rgba(0, 0, 0, 0.15);
        box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
        color: rgba(0, 0, 0, 0.65);
        transform: translateY(0);
    }
</style>