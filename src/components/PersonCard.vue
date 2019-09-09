<template>
  <v-card class="mx-auto" flat :to="`/person/${person.slug}`">
    <v-img
      v-if="person.photo"
      :src="`${person.photo.url}?auto=compress&w=500&fit=fillmax`"
      class="white--text"
      height="200px"
    ></v-img>

    <v-avatar size="200" width="100%" flat v-else tile color="primary">
      <v-icon dark>mdi-account-circle</v-icon>
    </v-avatar>

    <v-card-title
      class="align-end fill-height font-weight-black px-0 pb-0 pt-2"
      v-html="person.name"
    />

    <v-card-text v-html="person.jobTitle" class="px-0" />
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