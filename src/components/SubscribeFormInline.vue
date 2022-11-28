<template>
  <v-form
    ref="form"
    action="https://newknowledge.us12.list-manage.com/subscribe/post?u=1db73363360c636b7502c16bd&amp;id=42eef8fc76"
    method="post"
    id="mc-embedded-subscribe-form"
    name="mc-embedded-subscribe-form"
    target="_blank"
    novalidate
  >
    <v-text-field
      label="Email address"
      color="primary"
      type="email"
      outlined
      value
      text
      name="EMAIL"
      class="required email mr-0"
      id="mce-EMAIL"
    >
      <div style="position: absolute; left: -5000px;" aria-hidden="true">
        <input type="text" name="b_1db73363360c636b7502c16bd_42eef8fc76" tabindex="-1" value />
      </div>
      <template v-slot:append-outer>
        <v-btn
          depressed
          color="primary"
          x-large
          type="submit"
          value="Subscribe"
          name="subscribe"
          id="mc-embedded-subscribe"
        >Subscribe</v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>

<style lang="postcss" scoped>
#app .v-messages {
  display: none;
}
</style>

<script>
export default {
  name: "SubscribeFormInline"
};
</script>