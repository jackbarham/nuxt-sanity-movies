<template>
  <div>
    <h1>Actors</h1>
    <ul>
      <li v-for="actor in actors" :key="actor._id">
        <NuxtLink :to="`/actors/${actor.slug.current}`" class="text-blue-500">
          {{ actor.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type Person = {
  _id: string
  name: string
  slug: { current: string }
}

const query = groq`*[_type == "person" && count(*[_type == "movie" && ^._id in castMembers[].person._ref]) > 0]{_id, name, slug}`
const { data: actors } = await useSanityQuery<Person[]>(query)
</script>
