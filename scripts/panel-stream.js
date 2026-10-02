// Streaming unlock check panel for Surge (type=generic).
// Tests whether common streaming services are reachable through the
// current egress IP. Best-effort: providers change detection methods,
// results are indicative, not guarantees.

var UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15';

function checkNetflix(cb) {
  $httpClient.get(
    { url: 'https://www.netflix.com/title/80018499', headers: { 'User-Agent': UA }, timeout: 10 },
    function (error, response) {
      if (error) return cb('Netflix: 检测失败');
      if (response.status === 200) return cb('Netflix: 全解锁 ✓');
      if (response.status === 403) return cb('Netflix: 仅自制');
      return cb('Netflix: 被封锁 ✗');
    }
  );
}

function checkDisneyPlus(cb) {
  $httpClient.get(
    { url: 'https://www.disneyplus.com', headers: { 'User-Agent': UA }, timeout: 10 },
    function (error, response, data) {
      if (error) return cb('Disney+: 检测失败');
      // Blocked regions get redirected to a preview/unavailable page.
      if (response.status === 200 && data && data.indexOf('preview') === -1) {
        return cb('Disney+: 全解锁 ✓');
      }
      return cb('Disney+: 被封锁 ✗');
    }
  );
}

function checkYouTubePremium(cb) {
  $httpClient.get(
    { url: 'https://www.youtube.com/premium', headers: { 'User-Agent': UA }, timeout: 10 },
    function (error, response, data) {
      if (error) return cb('YT Premium: 检测失败');
      if (response.status === 200 && data && data.indexOf('ad-free') !== -1) {
        return cb('YT Premium: 可用 ✓');
      }
      return cb('YT Premium: 不可用 ✗');
    }
  );
}

checkNetflix(function (n) {
  checkDisneyPlus(function (d) {
    checkYouTubePremium(function (y) {
      $done({ title: '流媒体解锁检测', content: n + '\n' + d + '\n' + y, icon: 'play.tv' });
    });
  });
});
