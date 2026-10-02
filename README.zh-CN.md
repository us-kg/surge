# us-kg/surge

![Surge iOS 5.14.6+](https://img.shields.io/badge/Surge_iOS-5.14.6%2B-blue) ![Surge Mac 5.10.3+](https://img.shields.io/badge/Surge_Mac-5.10.3%2B-blue)

一个完整、自托管的 Surge 资源仓库：开箱即用的配置模板、规则索引和模块——所有规则数据每天自动更新。

本仓库是自有供应链的**消费端**：

- [**Jovanykoch/rules**](https://github.com/Jovanykoch/rules) — 每天 CI 从上游（v2fly、hagezi、Loyalsoldier 等）构建规则产物（域名、IP、广告列表、GeoIP 数据库）。
- **us-kg/surge**（本仓库）— 面向 Surge 的一层：引用这些产物的配置模板、模块与文档。

这里不依赖任何第三方的规则服务。上游一变，每日构建自动跟进，本仓库照常工作。

## 目录结构

```
surge/
├── profiles/
│   ├── surge.conf              # 完整、带注释的 Surge 配置模板
│   └── surge-lite.conf         # 低内存设备用的 lite 版（ads-mini 列表）
├── rules/
│   └── README.md               # 自托管规则集索引 + 一行即用片段
├── modules/
│   ├── README.md               # 模块说明、安装方法与 MITM 配置流程
│   ├── adblock.sgmodule        # 广告/追踪拦截（自托管 hagezi 列表）
│   ├── youtube-ads.sgmodule    # 去除 YouTube App 内广告（需 MITM）
│   ├── netease-unlock.sgmodule # 网易云音乐解锁接线脚手架（需 MITM）
│   └── panels.sgmodule         # Dashboard 挂件：IP 信息、流媒体检测、订阅流量
├── scripts/
│   ├── youtube-ads.js          # YouTube 模块背后的响应清理脚本
│   ├── panel-ip.js             # 出口 IP / 地理位置 / ISP 挂件
│   ├── panel-stream.js         # 流媒体解锁检测挂件
│   └── panel-sub.js            # 订阅流量挂件（填入自己的订阅链接）
├── .github/workflows/
│   └── link-check.yml          # 每天检查所有远程资源 URL 是否可用
├── CHANGELOG.md
├── README.md / README.zh-CN.md
├── LICENSE                     # MIT
└── .gitignore
```

## 系统要求

- Surge iOS 5.14.6+ / Surge Mac 5.10.3+ —— `profiles/surge.conf` 使用了全局 `block-quic` 参数，需要此版本以上。
- Surge 4.8.0+ —— 仅在使用 `encrypted-dns-server`（`doh-server` 更名后的参数）时需要。

## 快速开始

**方案 A — 完整配置。** 下载 [`profiles/surge.conf`](profiles/surge.conf)，在 `[Proxy]` 节填入自己的节点（内含注释示例），通过 Surge 的 *Download Configuration from URL* 或 iCloud Drive 导入。

**方案 B — 只要广告拦截。** 在 Surge（*Modules → Install New Module*）用下面这个 URL 安装模块：

```
https://raw.githubusercontent.com/us-kg/surge/main/modules/adblock.sgmodule
```

**方案 C — 按需取用规则。** 从 [`rules/README.md`](rules/README.md) 复制任意一行，粘到你现有 Surge 配置的 `[Rule]` 节即可。

## 设计原则

1. **供应链自己说了算。** 规则数据来自我们可控的仓库和看得见的 CI，不用陌生人的 release 分支。
2. **配置是模板，不是保险箱。** 节点账号、MITM 证书材料绝不进仓库，所有占位符都有醒目标记。
3. **直白好过机巧。** 规则自上而下匹配，每节都注释了 *为什么*，一年后回来看依然能看懂。

## 路线图

- 更多模块（应用增强、去跳转等）
- 更多 Dashboard 面板脚本

## 许可证

MIT — 见 [LICENSE](LICENSE)。
