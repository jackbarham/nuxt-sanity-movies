<template>
  <div v-if="movie">
    <h1>{{ movie.title }}</h1>

    <section>
      <h2>Poster</h2>
      <img v-if="movie.posterUrl" :src="movie.posterUrl" :alt="movie.title" width="400" />
    </section>

    <section>
      <h2>Details</h2>
      <ul>
        <li><strong>Release Date:</strong> {{ formatDate(movie.releaseDate) }}</li>
        <li><strong>Popularity:</strong> {{ movie.popularity }}</li>
      </ul>
    </section>

    <section>
      <h2>Overview</h2>
      <div v-if="movie.overview">
        <p v-for="(block, index) in movie.overview" :key="index">
          {{ getBlockText(block) }}
        </p>
      </div>
    </section>

    <section>
      <h2>Cast</h2>
      <ul v-if="movie.castMembers?.length">
        <li v-for="cast in movie.castMembers" :key="cast._key">
          <NuxtLink :to="`/actors/${cast.person?.slug?.current}`" class="text-blue-500">
            {{ cast.person?.name }}
          </NuxtLink>
          as {{ cast.characterName }}
        </li>
      </ul>
      <p v-else>No cast members listed.</p>
    </section>

    <section>
      <h2>Crew</h2>
      <ul v-if="movie.crewMembers?.length">
        <li v-for="crew in movie.crewMembers" :key="crew._key">
          <NuxtLink :to="`/crew/${crew.person?.slug?.current}`" class="text-blue-500">
            {{ crew.person?.name }}
          </NuxtLink>
          — {{ crew.job }} ({{ crew.department }})
        </li>
      </ul>
      <p v-else>No crew members listed.</p>
    </section>
  </div>
  <div v-else>
    <p>Movie not found.</p>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '~/types/movie'

const route = useRoute()
const slug = route.params.slug as string

const query = groq`*[_type == "movie" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  overview,
  releaseDate,
  "posterUrl": poster.asset->url,
  popularity,
  castMembers[]{
    _key,
    characterName,
    person->{ name, slug }
  },
  crewMembers[]{
    _key,
    department,
    job,
    person->{ name, slug }
  }
}`

const { data: movie } = await useSanityQuery<Movie>(query, { slug })

function formatDate(dateString: string) {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString()
}

function getBlockText(block: any) {
  if (block._type !== 'block' || !block.children) return ''
  return block.children.map((child: any) => child.text).join('')
}
</script>
