<template>
  <div>
    <h1>Crew</h1>
    <ul>
      <li v-for="member in crew" :key="member._id">
        <NuxtLink :to="`/crew/${member.slug.current}`" class="text-blue-700">
          {{ member.name }}
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

const query = groq`*[_type == "person" && count(*[_type == "movie" && ^._id in crewMembers[].person._ref]) > 0]{_id, name, slug}`
const { data: crew } = await useSanityQuery<Person[]>(query)
</script>
