<template>
  <div class="">
    <h1>Movies</h1>
    <ul>
      <li v-for="movie in movies" :key="movie._id">
        <NuxtLink :to="`/movies/${movie.slug.current}`" class="text-blue-700">
          {{ movie.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '~/types/movie'

const query = groq`*[_type == "movie"]{_id, title, slug}`
const { data: movies } = await useSanityQuery<Movie[]>(query)
</script>
