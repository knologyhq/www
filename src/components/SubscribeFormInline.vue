<template>
  <v-form
    ref="form"
    action="https://newknowledge.us12.list-manage.com/subscribe/post?u=1db73363360c636b7502c16bd&amp;id=42eef8fc76"
    method="post"
    id="mc-embedded-subscribe-form"
    name="mc-embedded-subscribe-form"
    class="validate"
    target="_blank"
    novalidate
  >
    <v-text-field
      label="Subscribe to our newsletter"
      color="primary"
      type="email"
      value
      name="EMAIL"
      class="required email"
      id="mce-EMAIL"
    >
      <div style="position: absolute; left: -5000px;" aria-hidden="true">
        <input type="text" name="b_1db73363360c636b7502c16bd_42eef8fc76" tabindex="-1" value />
      </div>
      <template v-slot:append>
        <v-btn
          depressed
          tile
          color="primary"
          class="button"
          type="submit"
          value="Subscribe"
          name="subscribe"
          id="mc-embedded-subscribe"
        >Subscribe</v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>



<style lang="postcss">
</style>

<script>
export default {
  name: "SubscribeInlineForm"
};
</script>