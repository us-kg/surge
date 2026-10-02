# Changelog

本文档记录本仓库的所有重要变更。
格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)（待打 tag 后启用）。

## [Unreleased]

### 新增
- 每日链接健康检查 CI（`.github/workflows/link-check.yml`，每天 02:00 UTC 运行）：
  检查 7 个规则列表 URL、`chnroutes.mmdb`、全部 4 个模块与 4 个脚本的安装/引用链接，
  任一返回非 200 即告警。
- 在 `README.md` / `README.zh-CN.md` 中新增最低 Surge 版本要求 badge 与 Requirements 章节：
  全局 `block-quic` 参数要求 Surge iOS 5.14.6+ / Surge Mac 5.10.3+；
  `encrypted-dns-server` 要求 Surge 4.8.0+。
- `profiles/surge-lite.conf`：低内存设备用的 lite 版配置模板
  （广告列表默认 `ads-mini.list`，其余与完整版一致）。
- `modules/panels.sgmodule` + `scripts/panel-*.js`：Dashboard 挂件
  （出口 IP 信息、流媒体解锁检测、订阅流量），无需 MITM。
- `modules/youtube-ads.sgmodule` + `scripts/youtube-ads.js`：
  去除 YouTube App 播放器响应中的广告字段（需 MITM，尽力而为）。
- `modules/netease-unlock.sgmodule`：网易云音乐解锁接线脚手架
  （需 MITM，自带解锁后端；见模块内 Path A / Path B 说明）。
- `modules/README.md` 补 MITM 配置流程与安全注意事项。
- `[General]` 显式声明 `udp-policy-not-supported-behaviour = direct`。

### 修复
- 三个地区测速组的 `policy-regex-filter` 给裸国别码加词边界
  （`us`→`\bus\b`，`hk`/`sg` 同理）：之前裸 `us` 会误命中节点名中的英文单词（如 Plus）。
- `profiles/surge.conf` / `surge-lite.conf` 头部注释补上 `school.list` 数据源。
- `README.md` / `README.zh-CN.md` 目录树与路线图更新到当前文件结构。
- `modules/netease-unlock.sgmodule`：示例 rewrite 由 302 改为 307
  （保留 POST 方法与 body；302 会被客户端转成 GET）。
- `modules/README.md`：修正 MITM 章节指向（"above"→"below"）。
- `profiles/surge.conf` / `surge-lite.conf`：Apple 策略组注释说明默认选中 BackCN，
  非国区 Apple ID 建议把 direct/PROXY 排前面。

## [2026-10-02]

### 新增
- 新增 `school.list` 规则集索引（`rules/README.md`）：
  覆盖学校与教育域名（jjc.edu、lanecc.edu、Microsoft 365、Google 账号等）。
- `profiles/surge.conf` 新增 `School` 策略组（`select, PROXY, direct`），
  并在规则末尾增加 School 服务分流段（`DOMAIN-SET,...,school.list,School`），
  原 Fallback 段顺延为第 8 段。

## [2026-10-01]

### 新增
- 仓库初始化：完整的 Surge 资源仓库。
  - `profiles/surge.conf`：带详细注释的全量 Surge 配置模板。
  - `rules/README.md`：自托管规则集索引（Jovanykoch/rules）。
  - `modules/`：`adblock.sgmodule` 广告拦截模块 + 模块使用指南（`modules/README.md`）。
  - `README.md`（英文）与 `README.zh-CN.md`（中文）双语说明，MIT LICENSE，`.gitignore`。
- `modules/adblock.sgmodule`：基于 hagezi Multi PRO（约 23.1 万域名）的广告拦截模块，
  由 Jovanykoch/rules CI 每日构建。
- DNS 文档：在 `surge.conf` 中记录 ControlD + hagezi 的 DNS 层广告拦截 DoH 选项。

### 变更
- DNS 参数修正：`doh-server` 已更名为 `encrypted-dns-server`（以 Surge 发布说明为准），
  配置模板同步更新并补充注释说明。
- 广告拦截 DoH 默认值：由 hagezi Ultimate 改为 hagezi Pro
 （`https://freedns.controld.com/x-hagezi-pro`），
  并在注释中列出所有已验证的 ControlD 过滤器：
  `x-hagezi-light`、`x-hagezi-normal`、`x-hagezi-proplus`、`x-hagezi-ultimate`、
  `x-oisd`、`x-oisd-basic`（注：`x-hagezi-tif` 仅拦截恶意软件/钓鱼，不拦截广告）。
- `adblock.sgmodule` 默认规则由 `ads.list`（约 23.1 万条）切换为
  `ads-mini.list`（约 6 万条，更省内存）；原 `ads.list` 保留为注释，
  低内存设备建议使用 mini 版。
