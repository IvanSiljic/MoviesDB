<script setup>
    import movieDB from "/movieDB.svg"
    import githubWhite from "/githubWhite.svg"
</script>

<template>
    <div class="footer">
        <div class="footer-center">
            <div class="footer-left">
                <a href="https://www.themoviedb.org/" rel="noopener" target="_blank">
                    <img class="footer-left-moviedb" :src="movieDB" alt="">
                </a>
                Using TMDB api 
            </div>
            
            <div class="footer-links">
                <h3>Created by:</h3>
                <a class="link" href="https://github.com/IvanSiljic" rel="noopener" target="_blank">
                    <img :src="githubWhite"/>
                    IvanSiljic
                </a>
            </div>
            
            <div class="footer-links">
                <h3>Mentored by:</h3>
                <a class="link" href="https://github.com/markogracin" rel="noopener" target="_blank">
                    <img :src="githubWhite"/>
                    markogracin
                </a>
            </div>
            
            <div class="footer-links">
                <h3>Source Code</h3>
                <a class="link" href="https://github.com/IvanSiljic/MoviesDB" rel="noopener" target="_blank">
                    <img :src="githubWhite"/>
                    MoviesDB
                </a>
            </div>
        </div>
    </div>
</template>


<style scopde lang="scss">
    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: #0d253f;
        color: white;
        margin-top: 2rem;

        &-center {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 1500px;
            padding: 2rem;
            padding-left: 3rem;
        }

        &-left {
            display: flex;
            flex-direction: column;
            max-width: 700px;
            margin-right: 1.5rem;

            a {
                display: flex;
                justify-content: center;
            }

            &-moviedb {
                height: 5rem;
                margin-bottom: 1rem;
            }
        }

        &-links {
            display: flex;
            flex-direction: column;
            max-width: 700px;
            margin-left: 1.5rem;

            img {
                height: 1.5rem;
                margin-right: 0.5rem;
            }

            a {
                display: flex;
                align-items: center;
                color: white;
            }
        }
    }
</style>