<template>
  <div v-if="actor">
    <h1>{{ actor.name }}</h1>

    <section>
      <h2>Photo</h2>
      <img v-if="actor.imageUrl" :src="actor.imageUrl" :alt="actor.name" width="300" />
      <p v-else>No photo available.</p>
    </section>

    <section>
      <h2>Movies</h2>
      <ul v-if="actor.movies?.length">
        <li v-for="movie in actor.movies" :key="movie._id">
          <NuxtLink :to="`/movies/${movie.slug.current}`" class="text-blue-500">
            {{ movie.title }}
          </NuxtLink>
          <span v-if="movie.characterName"> as {{ movie.characterName }}</span>
        </li>
      </ul>
      <p v-else>No movies listed.</p>
    </section>
  </div>
  <div v-else>
    <p>Actor not found.</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

type Actor = {
  _id: string
  name: string
  slug: { current: string }
  imageUrl: string | null
  movies: {
    _id: string
    title: string
    slug: { current: string }
    characterName: string | null
  }[]
}

const query = groq`*[_type == "person" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  "imageUrl": image.asset->url,
  "movies": *[_type == "movie" && references(^._id)]{
    _id,
    title,
    slug,
    "characterName": castMembers[person._ref == ^.^._id][0].characterName
  }
}`

const { data: actor } = await useSanityQuery<Actor>(query, { slug })
</script>
