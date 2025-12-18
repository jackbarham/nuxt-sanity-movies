<template>
  <div class="">
    <h1>Movies</h1>
    <ul>
      <li v-for="movie in movies" :key="movie.title">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type Movie = {
  title: string
}

const query = groq`*[_type == "movie"]{title}`
const { data: movies } = await useSanityQuery<Movie[]>(query)
</script>