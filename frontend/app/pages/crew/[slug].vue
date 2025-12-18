<template>
  <div v-if="member">
    <h1>{{ member.name }}</h1>

    <section>
      <h2>Photo</h2>
      <img v-if="member.imageUrl" :src="member.imageUrl" :alt="member.name" width="300" />
      <p v-else>No photo available.</p>
    </section>

    <section>
      <h2>Movies</h2>
      <ul v-if="member.movies?.length">
        <li v-for="movie in member.movies" :key="movie._id">
          <NuxtLink :to="`/movies/${movie.slug.current}`" class="text-blue-500">
            {{ movie.title }}
          </NuxtLink>
          <span v-if="movie.job"> — {{ movie.job }} ({{ movie.department }})</span>
        </li>
      </ul>
      <p v-else>No movies listed.</p>
    </section>
  </div>
  <div v-else>
    <p>Crew member not found.</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

type CrewMember = {
  _id: string
  name: string
  slug: { current: string }
  imageUrl: string | null
  movies: {
    _id: string
    title: string
    slug: { current: string }
    job: string | null
    department: string | null
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
    "job": crewMembers[person._ref == ^.^._id][0].job,
    "department": crewMembers[person._ref == ^.^._id][0].department
  }
}`

const { data: member } = await useSanityQuery<CrewMember>(query, { slug })
</script>
