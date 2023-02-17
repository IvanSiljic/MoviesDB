<template>
    <div class="page">
        <header>
            <Navbar/>
        </header>

        <slot/>

        <Footer />
    </div>
</template>

<style scoped lang="scss">
    .page {
        min-height: 100%;
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 100%;
    }
</style>