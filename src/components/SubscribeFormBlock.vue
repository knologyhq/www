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
      color="secondary"
      type="email"
      outlined
      value
      name="EMAIL"
      class="required email mr-0 mb-1"
      id="mce-EMAIL"
    >
      <div style="position: absolute; left: -5000px;" aria-hidden="true">
        <input type="text" name="b_1db73363360c636b7502c16bd_42eef8fc76" tabindex="-1" value />
      </div>
    </v-text-field>
    <v-btn
      depressed
      color="secondary"
      large
      class="button my-0"
      type="submit"
      value="Subscribe"
      name="subscribe"
      id="mc-embedded-subscribe"
    >Subscribe</v-btn>
  </v-form>
</template>

<style lang="postcss" scoped>
#app .v-messages {
  display: none;
}
#app .v-text-field__details {
  display: none !important;
}
</style>

<script>
export default {
  name: "SubscribeFormInline"
};
</script>