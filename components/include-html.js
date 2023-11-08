/**
 * Includes a snippet of html from a remote source.
 */
class IncludeHtml extends HTMLElement {
  static observedAttributes = ["src", "data"];

  /**
   * Creates a shadow root and attaches it to the element.
   */
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  /**
   * Updates the element when an attribute changes.
   */
  attributeChangedCallback() {
    this.refresh();
  }

  /**
   * Refreshes the element's content. Does not support remote script execution.
   */
  async refresh() {
    const templateData = this.parseJson(this.getAttribute("data"));
    if (templateData["banner_width"] == undefined) {
      templateData["banner_width"] = "1024px";
    }
    if (templateData["lower_tier_identifier"] == undefined) {
      templateData["lower_tier_identifier"] = ["-dev.", "-qa."]
    }
    const lower_tier_identifier = templateData["lower_tier_identifier"];
    const host = window.location.host;
    let lower_tier = false;
    for (let i = 0; i< lower_tier_identifier.length; i++) {
      if (host.includes(lower_tier_identifier[i])) {
        lower_tier = true;
        break;
      }
    };
    let sourceUrl = this.getAttribute("src");
    if (lower_tier) {
      sourceUrl = sourceUrl.replace(".html", "-test.html");
    }
    const response = await fetch(sourceUrl, { cache: "no-store" });
    const html = response.ok ? await response.text() : "";
    const enabled = this.getConfig(html)?.ENABLED?.toUpperCase() ?? "TRUE";
    // Disable scripts by setting innerHTML directly (as opposed to appendChild)
    this.shadow.innerHTML = enabled === "TRUE"
      ? this.formatTemplate(html, templateData)
      : "";
  }

  /**
   * Parses a JSON string into an object. Returns an empty object if the string is not valid JSON.
   * @param {String} str 
   * @returns {any}
   */
  parseJson(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return {};
    }
  }

  /**
   * Returns an object containing configuration keys and values, defined as <!--KEY=VALUE--> in the html.
   * @param {string} html
   * @returns {Record<string, string>} Config object
   */
  getConfig(html) {
    const matches = html.matchAll(/<!--(.*)=(.*)-->/g);
    const config = {};
    for (const [match, key, value] of matches) {
      config[key.trim()] = value.trim();
    }
    return config;
  }

  /**
   * Formats a string template with the provided data.
   * @param {string} str - Template string
   * @param {Record<string, any} data - Data to replace
   * @param {string} start - Start delimiter
   * @param {string} end - End delimiter
   * @returns 
   */
  formatTemplate(str, data, start = "\\{\\{", end = "\\}\\}") {
    for (let key in data) {
      str = str.replace(new RegExp(start + key + end, "gi"), data[key]);
    }
    return str;
  }
}

customElements.define("include-html", IncludeHtml);
