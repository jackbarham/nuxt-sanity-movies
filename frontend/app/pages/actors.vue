<template>
  <div>
    <h1>Actors</h1>
    <ul>
      <li v-for="actor in actors" :key="actor.name">
        {{ actor.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type Person = {
  name: string
}

const query = groq`*[_type == "person"]{name}`
const { data: actors } = await useSanityQuery<Movie[]>(query)
</script>