<template>
  <div>
    <h1>Screenings</h1>
    <ul>
      <li v-for="screening in screenings" :key="screening._id">
        <NuxtLink :to="`/screenings/${screening._id}`">
          {{ screening.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type Screening = {
  _id: string
  title: string
}

const query = groq`*[_type == "screening"]{_id, title}`
const { data: screenings } = await useSanityQuery<Screening[]>(query)
</script>
