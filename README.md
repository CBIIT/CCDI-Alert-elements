# ccdi-alert-elements

This repository demonstrates a pattern for efficiently distributing alerts across websites. A centralized HTML snippet, loaded by a web component, is rendered in the header of each application. This approach enables applications to display up-to-date alerts, such as official shutdown notices, without requiring code changes. Note that the snippet endpoint can be dynamically rendered (eg: by PHP), which may be useful for customizing the snippet depending on request context.

### Enabling/Disabling Snippets

An optional comment can be included in the first line of the HTML snippet to enable or disable the snippet. Without this comment, the snippet is enabled by default.

To enable the snippet, use: ```<!-- ENABLED=TRUE -->```

To disable the snippet, use: ```<!-- ENABLED=FALSE -->```


### Example: Basic Usage
```html
<head>
  ...
  <!-- Import web component -->
  <script src="https://cbiit.github.io/ccdi-alert-elements/components/include-html.js"></script>
</head>

<body>
  <header>
    <!-- Set component's src attribute to url of html snippet -->
    <include-html src="https://cbiit.github.io/ccdi-alert-elements/banners/government-shutdown.html" data='{"banner_width": "1334px", "lower_tier_identifier": ["localhost:", "-dev.", "-dev2.", "-qa.", "-qa2."]}'></include-html>
  </header>
  ...
</body>
```

### Example: HTML Snippet ([banners/government-shutdown-test.html](https://github.com/CBIIT/nci-softwaresolutions-elements/blob/main/banners/government-shutdown-test.html))
```html
<!-- ENABLED=TRUE -->

<style type="text/css">
  .nci-shutdown-banner {
    font-family: sans-serif;
    background: #bb0e3d;
    padding: 15px;
  }

  .nci-shutdown-banner__body {
    max-width: 1024px;
    margin: 0 auto;
    color: white;
    font-size: 17px;
    line-height: 1.6;
    position: relative;
    padding: 0 15px 0 40px;
  }

  .nci-shutdown-banner__body:before {
    content: "";
    display: block;
    position: absolute;
    height: 26px;
    width: 26px;
    top: 0;
    left: 0;
    background: none;
    background-color: #fff;
    -webkit-mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMSAxNWgtMnYtMmgydjJ6bTAtNGgtMlY3aDJ2NnoiLz48L3N2Zz4=) no-repeat center/contain;
    mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMSAxNWgtMnYtMmgydjJ6bTAtNGgtMlY3aDJ2NnoiLz48L3N2Zz4=) no-repeat center/contain;
  }

  .nci-shutdown-banner__body h2 {
    font-size: 18px;
    margin: 0;
  }
  .nci-shutdown-banner__body a,
  .nci-shutdown-banner__body a:visited {
    color: white;
  }
</style>

<section class="nci-shutdown-banner" aria-label="Government Funding Lapse">
  <div class="nci-shutdown-banner__body">
    <h2>Government Funding Lapse</h2>
    <p style="margin: 0">
      Because of a lapse in government funding, the information on this website may not be up to date, transactions submitted via the website may not be processed, and the agency may not be able to respond to inquiries until appropriations are enacted. The NIH Clinical Center (the research hospital of NIH) is open. For more details about its operating status, please visit
      <a href="https://cc.nih.gov/">cc.nih.gov</a>. Updates regarding government operating status and resumption of normal operations can be found at <a href="https://opm.gov/">OPM.gov</a>.
    </p>
  </div>
</section>
```