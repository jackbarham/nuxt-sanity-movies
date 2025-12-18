<template>
  <div>
    <h1>Actors</h1>
    <ul>
      <li v-for="member in crew" :key="member._id">
        <NuxtLink :to="`/actors/${member.slug.current}`" class="text-blue-500">
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

const query = groq`*[_type == "person"]{_id, name, slug}`
const { data: crew } = await useSanityQuery<Person[]>(query)
</script>
