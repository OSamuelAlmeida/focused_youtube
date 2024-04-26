<script>
  import Toggle from "@components/Toggle.vue"
  import {
    ENABLED_KEY,
    INFINITE_SCROLL_KEY,
    SETTINGS_COMMENTS_KEY,
    readStorageKey,
    writeStorageData,
  } from "@js/chrome-storage"

  const reloadPageIfYoutube = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].url.includes("youtube.com")) {
        chrome.tabs.reload(tabs[0].id)
      }
    })
  }

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

        readStorageKey(ENABLED_KEY, (value) => {
          if (typeof value === "undefined") {
            this.showCommentsToggle = false
          } else {
            this.showCommentsToggle = value
          }
        })
      })

      readStorageKey(INFINITE_SCROLL_KEY, (value) => {
        if (typeof value === "undefined") {
          this.infiniteScrollEnabled = false
        } else {
          this.infiniteScrollEnabled = value
        }

        readStorageKey(ENABLED_KEY, (value) => {
          if (typeof value === "undefined") {
            this.showInfiniteScrollToggle = false
          } else {
            this.showInfiniteScrollToggle = value
          }
        })
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
      handleEnabledToggle(val) {
        writeStorageData(ENABLED_KEY, val, () => {
          this.enabled = val
          this.showCommentsToggle = val
          this.showInfiniteScrollToggle = val
        })

        reloadPageIfYoutube()
      },
      handleCommentsToggle(val) {
        writeStorageData(SETTINGS_COMMENTS_KEY, val, () => {
          this.commentsSectionEnabled = val
        })

        reloadPageIfYoutube()
      },
      handleInfiniteScrollToggle(val) {
        writeStorageData(INFINITE_SCROLL_KEY, val, () => {
          this.infiniteScrollEnabled = val
        })

        reloadPageIfYoutube()
      },
    },
  }
</script>

<template>
  <div class="focused-youtube-settings">
    <div class="focused-youtube-settings__toggles">
      <Toggle
        v-if="showEnabled"
        title="Enable Focused Youtube"
        name="Enabled"
        class="focused-youtube-settings__toggle"
        :toggled="enabled"
        @toggle="handleEnabledToggle"
      />

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
