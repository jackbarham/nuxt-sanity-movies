<template>
  <div v-if="screening">
    <h1>{{ screening.title }}</h1>

    <section>
      <h2>Movie</h2>
      <p v-if="screening.movie">
        <NuxtLink :to="`/movies/${screening.movie.slug?.current}`" class="text-blue-700">
          {{ screening.movie.title }}
        </NuxtLink>
      </p>
      <p v-else>No movie assigned.</p>
    </section>

    <section>
      <h2>Schedule</h2>
      <ul>
        <li><strong>Starts:</strong> {{ formatDateTime(screening.beginAt) }}</li>
        <li><strong>Ends:</strong> {{ formatDateTime(screening.endAt) }}</li>
      </ul>
    </section>

    <section>
      <h2>Details</h2>
      <ul>
        <li><strong>Published:</strong> {{ screening.published ? 'Yes' : 'No' }}</li>
        <li><strong>Allowed Guests:</strong> {{ formatAllowedGuests(screening.allowedGuests) }}</li>
      </ul>
    </section>

    <section v-if="screening.infoUrl">
      <h2>More Info</h2>
      <p>
        <a :href="screening.infoUrl" target="_blank" rel="noopener noreferrer" class="text-blue-700">
          {{ screening.infoUrl }}
        </a>
      </p>
    </section>

    <section v-if="screening.ticketUrl">
      <h2>Ticket</h2>
      <p>
        <a :href="screening.ticketUrl" target="_blank" rel="noopener noreferrer" class="text-blue-700">
          Download Ticket (PDF)
        </a>
      </p>
    </section>
  </div>
  <div v-else>
    <p>Screening not found.</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string

type Screening = {
  _id: string
  title: string
  movie: {
    _id: string
    title: string
    slug: { current: string }
  } | null
  published: boolean
  beginAt: string
  endAt: string
  allowedGuests: string
  infoUrl: string | null
  ticketUrl: string | null
}

const query = groq`*[_type == "screening" && _id == $id][0]{
  _id,
  title,
  movie->{
    _id,
    title,
    slug
  },
  published,
  beginAt,
  endAt,
  allowedGuests,
  infoUrl,
  "ticketUrl": ticket.asset->url
}`

const { data: screening } = await useSanityQuery<Screening>(query, { id })

function formatDateTime(dateString: string) {
  if (!dateString) return 'Not set'
  return new Date(dateString).toLocaleString()
}

function formatAllowedGuests(value: string) {
  const labels: Record<string, string> = {
    members: 'Members only',
    friends: 'Members and friends',
    anyone: 'Anyone',
  }
  return labels[value] || value || 'Not specified'
}
</script>
