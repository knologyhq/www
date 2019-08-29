<template>
  <v-card class="mx-auto" flat :to="`/person/${person.slug}`">
    <v-img
      v-if="person.photo"
      :src="`${person.photo.url}?auto=compress&w=500&fit=fillmax`"
      class="white--text"
      height="200px"
    >
      <v-card-title class="align-end fill-height" v-html="person.name" />
    </v-img>
    <v-card-title v-else class="align-end fill-height" v-html="person.name" />

    <v-card-text v-html="person.jobTitle" />
  </v-card>
</template>

<style lang="postcss">
</style>

<script>
export default {
  name: "PersonCard",
  props: ["person"]
};
</script>