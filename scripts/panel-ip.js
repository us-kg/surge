// IP info panel for Surge (type=generic).
// Shows current egress IP, geo location and ISP — useful for verifying
// which policy/region your traffic actually exits from.

$httpClient.get(
  { url: 'http://ip-api.com/json/?fields=query,country,countryCode,city,isp', timeout: 10 },
  function (error, response, data) {
    if (error || response.status !== 200) {
      $done({ title: 'IP 查询失败', content: '请检查网络后重试', icon: 'xmark.circle' });
      return;
    }
    try {
      var info = JSON.parse(data);
      $done({
        title: info.query || '未知 IP',
        content: (info.country || '') + ' ' + (info.city || '') + '\n' + (info.isp || ''),
        icon: 'network',
      });
    } catch (e) {
      $done({ title: '解析失败', content: '请稍后重试', icon: 'xmark.circle' });
    }
  }
);
