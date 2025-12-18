# Nuxt v4 + Sanity Learning Project

## Goals
1. Fetch Sanity data into Nuxt v4 frontend
2. Get visual editing working

## Project Context
- Demo/playground for learning Nuxt v4 + Sanity integration
- Not for public deployment
- Local development only

## Sanity Configuration
- Frontend config: `frontend/.env` (see `.env.example`)
- Studio config: `studio/.env` (see `.env.example`)
- Demo data: Movies, people, screenings

## Tech Stack
- Frontend: Nuxt 4 with @nuxtjs/sanity module
- CMS: Sanity Studio with movie demo data
- Package manager: pnpm

## Project Structure
- `frontend/` - Nuxt 4 application
- `studio/` - Sanity Studio

## Key Commands
- `cd frontend && pnpm dev` - Run Nuxt dev server
- `cd studio && pnpm dev` - Run Sanity Studio

## Content Schema
- `movie` - Main movie documents (title, poster, cast, crew, overview)
- `person` - Actor/crew profiles
- `screening` - Event schedules

## Code Style
- Vue SFC order: `<template>` then `<script>` then `<style>`

## Notes
- Using `useSanityQuery()` composable for data fetching
- Visual editing requires @sanity/visual-editing package
