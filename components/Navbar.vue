<template>
    <div class="navbar">
        <div class="navbar-links">
            <div class="navbar-links-left">
                <NuxtLink class="link" to="/">
                    <i class="material-symbols-rounded">movie</i>
                </NuxtLink>
            </div>
            <div class="navbar-links-center logo">
                <NuxtLink class="link" to="/top-movies/1">Top Movies</NuxtLink>
                <NuxtLink class="link" to="/popular-movies/1">Popular Movies</NuxtLink>
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
        text-shadow: #000 0 0 5px;

        &-links {
            display: flex;
            justify-content: space-between;
            width: 100%;
            max-width: 1500px;
            
            &-center {
                display: flex;
                justify-content: space-between;
                width: fit-content;
            }
        }
    }
    
    .link {
        padding: 1rem;
        color: white;
    }
</style>