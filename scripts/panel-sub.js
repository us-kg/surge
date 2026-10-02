// Subscription traffic panel for Surge (type=generic).
//
// Reads the `subscription-userinfo` response header from your proxy
// subscription and shows used / total traffic plus expiry date.
//
// SETUP: replace SUB_URL below with your own subscription link.
// The URL stays on your device — never commit it to a repo.

var SUB_URL = 'YOUR_SUBSCRIPTION_URL';

function fmt(bytes) {
  var gb = bytes / 1073741824;
  return gb >= 10 ? gb.toFixed(0) + ' GB' : gb.toFixed(2) + ' GB';
}

if (SUB_URL.indexOf('YOUR_SUBSCRIPTION_URL') !== -1) {
  $done({ title: '订阅信息', content: '请先在脚本中填写 SUB_URL', icon: 'exclamationmark.circle' });
} else {
  $httpClient.get(
    { url: SUB_URL, headers: { 'User-Agent': 'Surge' }, timeout: 15 },
    function (error, response) {
      if (error || !response.headers) {
        $done({ title: '订阅信息', content: '获取失败，请检查链接', icon: 'xmark.circle' });
        return;
      }
      // Header keys may vary in case; normalize.
      var raw = response.headers['subscription-userinfo'] || response.headers['Subscription-Userinfo'] || '';
      if (!raw) {
        $done({ title: '订阅信息', content: '无流量信息', icon: 'xmark.circle' });
        return;
      }
      var info = {};
      raw.split(';').forEach(function (p) {
        var kv = p.trim().split('=');
        if (kv.length === 2) info[kv[0].trim()] = kv[1].trim();
      });
      var used = (parseInt(info.upload || 0, 10) + parseInt(info.download || 0, 10));
      var total = parseInt(info.total || 0, 10);
      var lines = ['已用 ' + fmt(used) + ' / 共 ' + fmt(total)];
      if (info.expire) {
        lines.push('到期 ' + new Date(parseInt(info.expire, 10) * 1000).toLocaleDateString());
      }
      $done({ title: '订阅流量', content: lines.join('\n'), icon: 'chart.bar' });
    }
  );
}
