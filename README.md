# us-kg/surge

![Surge iOS 5.14.6+](https://img.shields.io/badge/Surge_iOS-5.14.6%2B-blue) ![Surge Mac 5.10.3+](https://img.shields.io/badge/Surge_Mac-5.10.3%2B-blue)

A complete, self-hosted Surge resource repository: a ready-to-use profile, rule-set index, and modules — all wired to rule data that updates itself every day.

This repo is the **consumer side** of a small self-owned supply chain:

- [**Jovanykoch/rules**](https://github.com/Jovanykoch/rules) — daily CI builds rule assets (domains, IPs, ad lists, GeoIP) from upstream sources (v2fly, hagezi, Loyalsoldier, …).
- **us-kg/surge** (this repo) — the Surge-facing layer: profile, modules, and documentation that reference those assets.

Nothing here depends on anyone else's rule service. If an upstream changes, the daily build picks it up; this repo keeps working.

## Layout

```
surge/
├── profiles/
│   ├── surge.conf              # Complete, annotated Surge profile template
│   └── surge-lite.conf         # Lite variant for low-memory devices (ads-mini list)
├── rules/
│   └── README.md               # Index of self-hosted rule sets + one-line snippets
├── modules/
│   ├── README.md               # How modules work + install guide + MITM setup
│   ├── adblock.sgmodule        # Ad/tracker blocking (self-hosted hagezi list)
│   ├── youtube-ads.sgmodule    # YouTube in-app ad removal (MITM required)
│   ├── netease-unlock.sgmodule # NetEase Cloud Music unlock wiring (MITM required)
│   └── panels.sgmodule         # Dashboard widgets: IP info, stream check, sub traffic
├── scripts/
│   ├── youtube-ads.js          # Response cleaner behind the YouTube module
│   ├── panel-ip.js             # Egress IP / geo / ISP widget
│   ├── panel-stream.js         # Streaming-unlock check widget
│   └── panel-sub.js            # Subscription traffic widget (fill in your own URL)
├── .github/workflows/
│   └── link-check.yml          # Daily health check of all remote asset URLs
├── CHANGELOG.md
├── README.md / README.zh-CN.md
├── LICENSE                     # MIT
└── .gitignore
```

## Requirements

- Surge iOS 5.14.6+ / Surge Mac 5.10.3+ — required by the global `block-quic` parameter used in `profiles/surge.conf`.
- Surge 4.8.0+ — required only if you use `encrypted-dns-server` (the renamed `doh-server` parameter).

## Quick start

**Option A — full profile.** Download [`profiles/surge.conf`](profiles/surge.conf), fill in the `[Proxy]` section with your own nodes (commented examples included), and import it into Surge via *Download Configuration from URL* or iCloud Drive.

**Option B — ad blocking only.** Install the module in Surge (*Modules → Install New Module*) with this URL:

```
https://raw.githubusercontent.com/us-kg/surge/main/modules/adblock.sgmodule
```

**Option C — cherry-pick rule sets.** Copy any one-liner from [`rules/README.md`](rules/README.md) into your existing Surge config's `[Rule]` section.

## Design principles

1. **Own the supply chain.** Rule data comes from repositories we control and CI we can inspect — never from a stranger's release branch.
2. **Profiles are templates, not secrets.** Node credentials and MITM CA material never belong in this repo; every placeholder is clearly marked.
3. **Boring and explicit beats clever.** Rules are ordered top-down, each section commented with *why*, so the config stays debuggable a year from now.

## Roadmap

- More modules (app-specific enhancements, anti-redirect)
- More dashboard panel scripts

## License

MIT — see [LICENSE](LICENSE).
