# Modules

Surge modules (`.sgmodule`) are installable feature packs: a bundle of rules, rewrites and scripts you can turn on/off without touching your main profile.

## Install

In Surge: **Modules → Install New Module**, paste the module URL, done. Or download the `.sgmodule` file and open it on your iPhone — Surge will offer to install it.

## Available modules

| Module | What it does |
| --- | --- |
| [`adblock.sgmodule`](adblock.sgmodule) | Rejects ads & trackers using the self-hosted hagezi list (`ads-mini.list` by default, rebuilt daily). No MITM required. |
| [`netease-unlock.sgmodule`](netease-unlock.sgmodule) | Wiring for unlocking region-locked NetEase Cloud Music songs (MITM required; bring your own unlock endpoint — see below). |
| [`youtube-ads.sgmodule`](youtube-ads.sgmodule) | Strips ad fields from YouTube player API responses (MITM required; best-effort — YouTube changes their API periodically). |

Install URL:

```
https://raw.githubusercontent.com/us-kg/surge/main/modules/adblock.sgmodule
https://raw.githubusercontent.com/us-kg/surge/main/modules/netease-unlock.sgmodule
https://raw.githubusercontent.com/us-kg/surge/main/modules/youtube-ads.sgmodule
```

### NetEase unlock: how it works

Grayed-out songs are region-locked on NetEase's side — the app gets no
playable URL. Unlocking means substituting an alternative audio source,
which needs a backend. The module gives you the hooks; pick a backend:

- **Self-host (recommended).** Run
  [UnblockNeteaseMusic/server](https://github.com/UnblockNeteaseMusic/server)
  on your own VPS, uncomment the `[URL Rewrite]` rule in the module and
  set `YOUR_SERVER`. You control the server, so nothing leaks to third
  parties.
- **Community script.** Find a maintained unlock script, paste its URL
  into the `[Script]` entry. Only use scripts from repos you trust, and
  expect breakage when NetEase changes their API.

Either way, complete the [MITM setup](#mitm-setup-for-script-modules)
above first — without it, Surge can't see the API traffic.

## MITM setup (for script modules)

Some modules need to inspect or modify HTTPS traffic (e.g. unlocking
region-locked songs, removing in-app ads). That requires MITM
(man-in-the-middle) — Surge decrypts the traffic with its own CA so
scripts can read and rewrite request/response bodies.

This is a one-time setup on each device:

1. **Install Surge's CA.** In Surge: *Settings → MITM → Install Certificate*,
   then open iOS *Settings → General → VPN & Device Management* and install
   the downloaded profile.
2. **Trust the CA.** In iOS *Settings → General → About → Certificate Trust
   Settings*, enable full trust for the Surge certificate.
3. **Declare hostnames.** MITM only applies to hostnames you explicitly
   list. In your profile's `[MITM]` section (or inside a module):
   ```
   [MITM]
   hostname = %APPEND% music.163.com, *.music.163.com
   ```
   Use `%APPEND%` so you don't overwrite hostnames declared by other
   modules. Keep the list minimal — only the domains the module's scripts
   actually touch.
4. **Scripts go in `[Script]`.** Example (http-response body rewrite):
   ```
   [Script]
   NetEase Unlock = type=http-response,pattern=^https://music\.163\.com/api/,script-path=https://example.com/unlock.js,requires-body=true,timeout=10
   ```

**Security notes**

- Only install a CA you generated yourself (Surge generates one per
  installation). Never install someone else's CA.
- CA private keys and passphrases are secrets: they never belong in this
  repo (same rule as proxy credentials). If a module needs
  `ca-passphrase`, each user sets their own.
- If a hostname stops working after an app update, the app likely moved
  to new domains or certificate pinning — check and update the hostname
  list before assuming the script broke.

## Writing your own

A minimal module looks like this:

```
#!name=My Module
#!desc=What it does, in one line.

[Rule]
DOMAIN-SUFFIX,example.com,REJECT
```

Header fields you can use: `#!name`, `#!desc`, `#!category`, `#!author`, `#!icon`, `#!system` (e.g. `ios,mac`). Sections work like profile sections: `[Rule]`, `[URL Rewrite]`, `[MITM]`, `[Script]`, `[Host]`. Keep modules focused on one job each.
