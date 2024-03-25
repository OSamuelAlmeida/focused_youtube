<script>
  import Toggle from "@components/Toggle.vue"
  import {
    ENABLED_KEY,
    INFINITE_SCROLL_KEY,
    SETTINGS_COMMENTS_KEY,
    readStorageKey,
    writeStorageData,
  } from "@js/chrome-storage"

  export default {
    components: {
      Toggle,
    },
    data() {
      return {
        showCommentsToggle: false,
        commentsSectionEnabled: false,
        infiniteScrollEnabled: false,
        showInfiniteScrollToggle: false,
        showEnabled: false,
        enabled: false,
      }
    },
    mounted() {
      readStorageKey(SETTINGS_COMMENTS_KEY, (value) => {
        if (typeof value === "undefined") {
          this.commentsSectionEnabled = false
        } else {
          this.commentsSectionEnabled = value
        }

        this.showCommentsToggle = true
      })

      readStorageKey(INFINITE_SCROLL_KEY, (value) => {
        if (typeof value === "undefined") {
          this.infiniteScrollEnabled = false
        } else {
          this.infiniteScrollEnabled = value
        }

        this.showInfiniteScrollToggle = true
      })

      readStorageKey(ENABLED_KEY, (value) => {
        if (typeof value === "undefined") {
          this.enabled = true
        } else {
          this.enabled = value
        }

        this.showEnabled = true
      })
    },
    methods: {
      handleCommentsToggle(val) {
        writeStorageData(SETTINGS_COMMENTS_KEY, val, () => {
          this.commentsSectionEnabled = val
        })
      },
      handleInfiniteScrollToggle(val) {
        writeStorageData(INFINITE_SCROLL_KEY, val, () => {
          this.infiniteScrollEnabled = val
        })
      },
      handleEnabledToggle(val) {
        writeStorageData(ENABLED_KEY, val, () => {
          this.enabled = val
        })
      },
    },
  }
</script>

<template>
  <div class="focused-youtube-settings">
    <div class="focused-youtube-settings__toggles">
      <Toggle
        v-if="showCommentsToggle"
        title="Show comments"
        name="Comments section"
        class="focused-youtube-settings__toggle"
        :toggled="commentsSectionEnabled"
        @toggle="handleCommentsToggle"
      />

      <Toggle
        v-if="showInfiniteScrollToggle"
        title="Enable infinite scroll"
        name="Infinite scroll"
        class="focused-youtube-settings__toggle"
        :toggled="infiniteScrollEnabled"
        @toggle="handleInfiniteScrollToggle"
      />

      <Toggle
        v-if="showEnabled"
        title="Enable extension"
        name="Enabled"
        class="focused-youtube-settings__toggle"
        :toggled="enabled"
        @toggle="handleEnabledToggle"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .focused-youtube-settings {
    &__toggles {
      display: flex;
      flex-direction: column;
      margin-bottom: 36px;
    }

    &__toggle {
      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }
  }
</style>
