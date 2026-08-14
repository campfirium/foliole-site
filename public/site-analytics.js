(function () {
  var targets = new Set(["demo", "guides", "github"]);
  var platforms = new Set(["macos", "windows", "linux"]);

  document.addEventListener("click", function (event) {
    var link = event.target.closest(
      "a[data-recommended-download], a[data-platform-download], a[data-analytics-target]",
    );
    if (!link || typeof window.plausible !== "function") return;

    var platform =
      link.dataset.recommendedDownload || link.dataset.platformDownload;
    if (platforms.has(platform)) {
      window.plausible("Download", { props: { platform: platform } });
      return;
    }

    var target = link.dataset.analyticsTarget;
    if (targets.has(target)) {
      window.plausible("Outbound", { props: { target: target } });
    }
  });
})();
