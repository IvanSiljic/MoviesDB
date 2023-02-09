<template>
    <div class="navbar">
        <div class="navbar-links">
            <div class="navbar-links-center">
                <NuxtLink class="link" to="/">
                    <i class="material-symbols-rounded">movie</i>
                </NuxtLink>
            </div>
            <div class="navbar-links-center logo">
                <NuxtLink class="link" to="/">Home</NuxtLink>
                <NuxtLink class="link" to="/about">About</NuxtLink>
            </div>
            <div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .navbar {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        width: 100%;
        position: absolute;
        z-index: 50;
        text-shadow: #fff 0 0 5px;

        &-links {
            display: flex;
            justify-content: space-around;
            max-width: 1500px;
            width: 100%;

            &-center {
                display: flex;
                justify-content: space-between;
            }
        }
    }

    .link {
        margin: 1rem;
    }

    .logo {
        position: absolute;
    }
</style>