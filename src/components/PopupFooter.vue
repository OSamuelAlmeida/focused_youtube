<template>
  <footer class="focused-youtube-footer">
    <a
      class="focused-youtube-footer__link"
      target="_blank"
      href="https://chrome.google.com/webstore/detail/focused-youtube/nfghbmabdoakhobmimnjkamfdnpfammn?hl=en"
    >
      <strong>Rate it</strong>
    </a>

    <a
      class="focused-youtube-footer__link"
      target="_blank"
      href="https://twitter.com/makaroni4"
    >
      <strong>Say hi</strong>
    </a>

    <a
      class="focused-youtube-footer__link"
      target="_blank"
      href="https://github.com/OSamuelAlmeida/focused_youtube/issues"
    >
      <strong>Feedback</strong>
    </a>

    <a
      class="focused-youtube-footer__link"
      target="_blank"
      href="https://github.com/OSamuelAlmeida/focused_youtube"
    >
      <strong>Source code</strong>
    </a>
  </footer>
</template>

<style lang="scss" scoped>
  .focused-youtube-footer {
    display: flex;
    justify-content: space-between;

    &__link {
      color: #5f6368;
    }
  }

  @media (prefers-color-scheme: dark) {
    .focused-youtube-footer {
      &__link {
        color: #fff;
      }
    }
  }
</style>
