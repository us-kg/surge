// YouTube ad removal for Surge (http-response script).
//
// Hooks the youtubei player API response and strips ad-related fields so
// the app finds nothing to play. Best-effort: YouTube changes their
// response format periodically — if ads reappear, this script most likely
// needs its field list updated. Parse failures pass the response through
// untouched so playback never breaks because of this script.

(function () {
  try {
    var body = JSON.parse($response.body);

    // Top-level ad containers in the player response.
    delete body.adPlacements;
    delete body.adSlots;
    delete body.playerAds;

    // Nested ad metadata some clients read.
    if (body.playerConfig) {
      delete body.playerConfig.adSlots;
    }
    if (body.playbackTracking) {
      delete body.playbackTracking.adBreakHeartbeatParams;
    }

    $done({ body: JSON.stringify(body) });
  } catch (e) {
    $done({});
  }
})();
