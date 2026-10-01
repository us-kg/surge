# Rule sets

All rule data is built daily by CI in [**Jovanykoch/rules**](https://github.com/Jovanykoch/rules) from upstream sources (v2fly/domain-list-community, hagezi/dns-blocklists, Loyalsoldier/geoip, …). The `.list` files below are plain domain lists in **Surge DOMAIN-SET** format — paste the one-liner straight into your Surge `[Rule]` section.

Same data is also published as `.yaml` (Clash), `.quanx` (Quantumult X) and `.srs` (sing-box) in that repo.

| File | Description | Surge one-liner |
| --- | --- | --- |
| `china.list` | China domains (~111k, v2fly cn + Loyalsoldier china-list) | `DOMAIN-SET,https://raw.githubusercontent.com/Jovanykoch/rules/rel/china.list,BackCN` |
| `apple.list` | Apple services (App Store, iCloud, Music, updates…) | `DOMAIN-SET,https://raw.githubusercontent.com/Jovanykoch/rules/rel/apple.list,Apple` |
| `douyin.list` | Douyin China app (+ snssdk/pstatp/byteimg) | `DOMAIN-SET,https://raw.githubusercontent.com/Jovanykoch/rules/rel/douyin.list,BackCN` |
| `ads.list` | Ads & trackers (hagezi Multi PRO, ~231k) | `DOMAIN-SET,https://raw.githubusercontent.com/Jovanykoch/rules/rel/ads.list,REJECT` |
| `ads-mini.list` | Lighter ad list (hagezi PRO mini, ~60k) | `DOMAIN-SET,https://raw.githubusercontent.com/Jovanykoch/rules/rel/ads-mini.list,REJECT` |
| `ai.list` | AI services (OpenAI, Claude, Gemini…) | `DOMAIN-SET,https://raw.githubusercontent.com/Jovanykoch/rules/rel/ai.list,PROXY` |

**Notes**

- Replace the policy name (`BackCN`, `Apple`, `REJECT`, `PROXY`) with whatever your proxy groups are called.
- `ads.list` vs `ads-mini.list`: the full list is stronger; the mini list uses noticeably less memory on older devices.
- If `raw.githubusercontent.com` is unreachable from your network, swap the host for `cdn.jsdelivr.net` and the path form: `https://cdn.jsdelivr.net/gh/Jovanykoch/rules@rel/china.list` (updates may lag ~12h).
