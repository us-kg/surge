# Modules

Surge modules (`.sgmodule`) are installable feature packs: a bundle of rules, rewrites and scripts you can turn on/off without touching your main profile.

## Install

In Surge: **Modules → Install New Module**, paste the module URL, done. Or download the `.sgmodule` file and open it on your iPhone — Surge will offer to install it.

## Available modules

| Module | What it does |
| --- | --- |
| [`adblock.sgmodule`](adblock.sgmodule) | Rejects ads & trackers using the self-hosted hagezi Multi PRO list (`ads.list`, rebuilt daily). No MITM required. |

Install URL:

```
https://raw.githubusercontent.com/us-kg/surge/main/modules/adblock.sgmodule
```

## Writing your own

A minimal module looks like this:

```
#!name=My Module
#!desc=What it does, in one line.

[Rule]
DOMAIN-SUFFIX,example.com,REJECT
```

Header fields you can use: `#!name`, `#!desc`, `#!category`, `#!author`, `#!icon`, `#!system` (e.g. `ios,mac`). Sections work like profile sections: `[Rule]`, `[URL Rewrite]`, `[MITM]`, `[Script]`, `[Host]`. Keep modules focused on one job each.
