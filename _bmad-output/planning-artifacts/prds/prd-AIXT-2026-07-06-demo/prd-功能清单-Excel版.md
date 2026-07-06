# 小提大作（融合升级版）· 功能需求清单（Excel 版）

> **用途**：可直接全选复制到 Excel / 飞书表格 / Word。  
> **来源**：`_bmad-output/demo/index.html` + `prd-AIXT-2026-07-06-demo/prd.md`  
> **列说明**：页面板块 | 功能 | 需求说明 | 字段注释 | 截图示例  
> **实现度标记**（需求说明内）：✅ Demo已有 · 🔶 占位/部分 · ⬜ 目标态

---

## 使用说明

1. 从下方表格 **表头行开始** 全选复制，粘贴到 Excel 即可按列拆分。
2. 「截图示例」列填写 Demo 定位说明；正式交付时可替换为截图文件名或 URL。
3. 隐藏页（market/data/command 等）已纳入，标注为「隐藏页」。

---

## 功能需求总表

| 页面板块 | 功能 | 需求说明 | 字段注释 | 截图示例 |
|---------|------|---------|---------|---------|
| 全局 · 左侧主导航 | 导航栏展示 | 登录后左侧固定展示 7 项主导航：大赏、Agent、文创、工具、创作、资产、结算；当前页高亮；带 badge 项展示「新」「有新收益」。✅ | key: string 路由键；label: string 展示名；icon: string 图标组件名；badge: string 可选角标；badgeType: earn/new/pro | Demo · 左侧 rail · nav 七项 |
| 全局 · 左侧底部栏 | 底部快捷入口 | 底部固定 5 项：消息、联系、教程、爆米花快捷、个人头像；爆米花带「今日待领」角标。✅ | popcornTodayPending: boolean 是否显示待领角标 | Demo · rail-footer 五项 |
| 全局 · 路由切换 | 页面跳转 | 点击导航切换 active 页面；离开工具子页时停止播放/清定时器；离开文创详情时重置 cpScriptDetailId。✅ | active: string 当前页面 key | Demo · go() 切换任意页 |
| 全局 · 鉴权 | 登录态控制 | 工作台功能需登录；游客可访问大赏、教程、联系弹窗；未登录操作弹登录浮层。🔶 | requiresAuth: 工作台路由布尔 | Demo · interact() toast 占位 |
| 大赏 · Hero 区 | 轮播 Banner | 顶部卡片式轮播展示主推 IP/活动；自动轮播；左右切换。✅ | showcaseHeroSlides[]: { title, sub, bg, cta } | Demo · showcase · hero-wrap |
| 大赏 · 搜索栏 | 三维搜索 | 支持按类型、作者、标题三个维度筛选海报作品列表。✅ | showcaseSearch: { type, author, title } | Demo · showcase · 搜索栏三输入 |
| 大赏 · 作品网格 | 海报作品展示 | 网格展示 IP/影片卡片：封面、标题、作者、点赞/收藏/分享等社交元数据。✅ | posterWorks[]: { title, author, cover, likes, favorites, shares, type } | Demo · showcase · 海报宫格 |
| 大赏 · 作品互动 | 点赞/收藏/分享 | 登录用户可点赞、收藏、评论、分享、关注；未登录点击弹登录后补执行；评论需审核。⬜ | 互动字段待 API 定义 | 参照 prd-AIXT-2026-07-04/assets/film-showcase-reference.png |
| 大赏 · 创作复盘 | 反向复盘入口 | 从成片卡片可查看分镜/选题/Agent/工作流，跳转市场或 Agent 详情。⬜ | workId: string 关联作品 ID | 待补截图 |
| Agent · Tab 切换 | 四类 Agent 分类 | 一级 Tab：封面 / 视频 / 写作 / 剧本；切换时重置二级题材筛选。✅ | promptMode: cover/video/writing/script | Demo · prompts · 顶部 Tab |
| Agent · 题材筛选 | 二级题材 Chips | 按 families 配置展示题材 chips；支持「全部」与细分题材过滤。✅ | promptSubKey: string；promptFamilies[]: { key, label, subs[] } | Demo · prompts · chips 行 |
| Agent · 关键字搜索 | Agent 搜索 | 输入关键字过滤当前 Tab 下 Agent 卡片（标题/题材/标签）。✅ | promptSearch: string | Demo · prompts · 搜索框 |
| Agent · 卡片列表 | Agent 卡片展示 | 卡片展示 code、标题、题材、热度、标签、是否付费、封面预览图。✅ | id, code, title, genre, cat, key, img, hot, tags[], paid, prompt | Demo · prompts · 卡片流 |
| Agent · 详情弹窗 | Agent 详情与复制 | 点击卡片打开详情弹窗：完整 prompt 文本、封面大图、复制按钮。✅ | promptDetailItem: 卡片对象引用 | Demo · promptDetailDialog |
| 文创 · Hero | 顶部轮播 | 文创 Landing 顶部 Banner 轮播，展示活动/合作信息。✅ | cpBanners[]: { title, sub, image/bg } | Demo · copyright · Hero |
| 文创 · 投稿入口 | 编剧/作家双入口 | 两张入口卡：编剧投稿、作家发布小说；点击切换对应 Tab 或 toast 引导。🔶 | cpMainTab 切换 novel/script | Demo · copyright · 双入口卡 |
| 文创 · 主 Tab | 小说/剧本 Tab | 主 Tab 切换「小说版权」「剧本版权」两个库；切换重置列表状态。✅ | cpMainTab: novel/script | Demo · copyright · 主 Tab |
| 文创 · 小说搜索 | 书名搜索 | 按书名关键字模糊搜索小说版权列表。✅ | cpNovelQuery.bookName: string | Demo · copyright · 小说搜索框 |
| 文创 · 小说筛选 | 五维筛选胶囊 | 筛选：偏好、篇幅、类型、完结状态、版权方；支持「全部」选项。✅ | cpNovelQuery: { preference, longShort, category, completionStatus, copyrightOwner }；选项来自 cpFilterOptions | Demo · copyright · 筛选胶囊行 |
| 文创 · 小说排序 | 排序切换 | 支持升序/降序（如按上架时间）；点击排序按钮切换。✅ | cpNovelSort: ASC/DESC | Demo · copyright · 排序按钮 |
| 文创 · 小说宫格 | 小说卡片列表 | 宫格展示封面、书名、作者、独家类型、字数、版权方；hover 展示商务合作信息。✅ | cpBooks[]: 见字段注释扩展表 | Demo · copyright · 小说宫格 |
| 文创 · 小说 hover | 商务信息浮层 | 鼠标悬停卡片展示合作方式：独家/非独家、价格、分成比例或「询价」。✅ | cooperation[]: { label, lines[{ kind: price/shareRatio/inquiry, text, value }] } | Demo · copyright · 卡片 hover |
| 文创 · 询价弹窗 | 商务询价 | 点击询价打开弹窗，展示商务对接二维码。✅ | cpInquiryItem: book 对象；cpInquiryQr: url | Demo · cpInquiryDialog |
| 文创 · 小说详情 | 书籍详情页 | 点击小说进入详情（沿用线上小题样式）；展示完整版权与商务信息。🔶 | bookId: string | Demo · cpBookDetailDialog 占位 |
| 文创 · 剧本搜索 | 剧本搜索 | 按剧本名/标签搜索剧本版权列表。✅ | cpScriptQuery.bookName: string | Demo · copyright · 剧本搜索 |
| 文创 · 剧本宫格 | 剧本卡片列表 | 展示封面、标题、标签；点击进入 WWDS 详情子页。✅ | cpScripts[]: { id, title, tags[], coverUrl } | Demo · copyright · 剧本宫格 |
| 文创 · 剧本详情 · 概览 | WWDS 概览 Tab | 展示评级、综合分、六维雷达(W/I/H/G/R/V)、题材类型、预估字数、目标平台。✅ | scores: { w,i,h,g,r,v }；rating, finalScore, subjectType, estimatedChars, targetPlatform | Demo · 剧本详情 · overview Tab |
| 文创 · 剧本详情 · 改编 | 改编潜力 Tab | 展示短剧/漫画/有声/游戏/影视五维改编适配分与说明。✅ | adaptation: 各媒介得分与文案 | Demo · 剧本详情 · adaptation Tab |
| 文创 · 剧本详情 · 受众 | 受众与风险 Tab | 展示受众画像、政策/饱和/人设/更新四维风险及红线扫描。✅ | audience, risk, redlineScan | Demo · 剧本详情 · audience Tab |
| 文创 · 剧本详情 · 报告 | 完整报告 Tab | Markdown 格式完整评估报告，支持滚动阅读。✅ | report: markdown string | Demo · 剧本详情 · report Tab |
| 文创 · 剧本申领 | 申领剧本 | 详情页点击「申领剧本」打开商务二维码弹窗，线下对接。✅ | cpScriptClaimQr: url | Demo · cpScriptClaimDialog |
| 文创 · 爆榜排行 | 漫剧爆榜 | 展示平台播放量排行列表（抖音/红果等）；Tab 入口目标态开放。⬜ | cpRanking[]: { rank, title, author, platform, playCount, hongguoHeat } | Demo · copyright · rank 面板(orphan) |
| 工具 · 工具箱 | 工具卡片列表 | 展示 7 个工具入口卡片：标题、描述、使用人数、封面。✅ | WORKBENCH_TOOLS.tools[]: { id, title, desc, users, cover, page? } | Demo · tools · 7 卡网格 |
| 工具 · 弹窗工具 | 链接提取类工具 | 5 个弹窗工具：提示词提取、视频结构提取、音频提取、资产提取、视觉 IP Agent；输入链接→输出结果块→可复制→提交审核。✅ | activeTool, toolLink, toolResult；inputLabel, submitLabel 来自 tools 配置 | Demo · toolDialog |
| 工具 · 视频结构桥接 | 细纲写剧本 | 视频结构提取结果区提供「用细纲写剧本」按钮，跳转写作编辑器。✅ | 细纲文本块 → writing 页 | Demo · toolDialog · video-structure |
| 工具 · 剧本评估 · 输入 | 剧本粘贴评估 | 全页左栏粘贴剧本文本，选择模型、质量标准、提示词 preset。✅ | scriptEvalInput: string；model, quality, preset 选项 | Demo · script-eval · 左栏 |
| 工具 · 剧本评估 · 执行 | 立即评估 | 点击「立即评估」生成 WWDS 六维报告；支持自定义提示词弹窗。✅ | scriptEvalResult: 见 WWDS 报告结构 | Demo · script-eval · 评估按钮 |
| 工具 · 剧本评估 · 报告 | 评估报告 Tab | 右栏 Tab：概览/红线/改编/受众/完整报告；可复制、提交审核。✅ | tab: overview/redline/adaptation/audience/report | Demo · script-eval · 报告 Tab |
| 工具 · 剧本拆解 · 集列表 | 分集列表 | 左栏展示项目分集列表，选中切换当前集。✅ | sbProject.episodes[]: { id, index, fileName, status, duration, poster, summary } | Demo · script-breakdown · 左栏 |
| 工具 · 剧本拆解 · 视频区 | 视频与梗概 | 中栏展示当前集视频预览、时长、梗概摘要。✅ | episode.poster, summary, duration | Demo · script-breakdown · 中栏 |
| 工具 · 剧本拆解 · 脚本 | 分场景脚本 | 右栏按场景展示 setting/characters/props/lines；支持标准/国际格式切换与复制。✅ | scenes[]: { number, setting, settingIntl, characters, props, lines[{ type, speaker, text }] } | Demo · script-breakdown · 右栏 |
| 创作 · Banner | 3D 活动 Banner | 顶部 3D 轮播 Banner，可点击跳转画布。✅ | projBanners[]: { title, sub, link } | Demo · projects · Banner |
| 创作 · Tab 切换 | 三 Tab 项目 hub | Tab：影片 / 写作 / 剧本；切换展示对应项目列表与创建卡。✅ | projTab: film/writing/script | Demo · projects · Tab |
| 创作 · 创建卡 | 新建项目 | 每 Tab 首张为创建卡；点击打开 createModeDialog 说明后进入对应编辑器。✅ | projCreateConfig: 各 Tab 文案与 link(canvas/writing) | Demo · projects · 创建卡 |
| 创作 · 项目列表 | 历史项目宫格 | 展示项目封面、名称、日期/字数/集数；点击进入对应创作页。✅ | filmProjects/writingProjects/scriptProjects[]: { id, name, date, cover, link } | Demo · projects · 项目宫格 |
| 创作 · 创建弹窗 | 模式说明弹窗 | 创建/购买时弹窗提示「沿用现有流程/画布模式/写作模式」。🔶 | createModeMessage: string | Demo · createModeDialog |
| 写作 · 顶栏 | 作品信息与操作 | 顶栏展示作品名；提供「一键确权挂牌」「导出全文」按钮。✅ | 作品 title；跳转 copyright | Demo · writing · 顶栏 |
| 写作 · 章节目录 | 章节树 | 左栏章节目录列表，点击切换当前编辑章节。✅ | chapters[]: { id, title, wordCount }；chapterTitle: string | Demo · writing · 左栏目录 |
| 写作 · 正文编辑 | 章节正文 | 中栏富文本/Markdown 编辑器编辑章节正文。✅ | draftText: string | Demo · writing · 编辑器 |
| 写作 · AI 助手 | AI 生成 | 右栏 AI 助手：选择写作风格；按钮生成大纲/细纲/正文/重写。✅ | writeStyle: string；操作消耗米花 🌽 | Demo · writing · AI 助手 |
| 写作 · 确权跳转 | 一键确权挂牌 | 完成后一键跳转文创模块登记小说版权。✅ | 跨页 go('copyright') | Demo · writing · 确权按钮 |
| 画布 · 模式切换 | SOP / 自由画布 | 顶部切换 SOP 引导模式与自由画布模式；共享同一份项目数据。✅ | canvasMode: sop/free | Demo · canvas · 模式切换 |
| 画布 · SOP · 步骤条 | 七步流水线 | 步骤：选题→风格→剧本→分镜→人物→场景→合成视频；当前步高亮；前序未完成锁定后序。✅ | sopSteps[]: 7 步名称；sopActive: number 当前索引 | Demo · canvas · SOP 步骤条 |
| 画布 · SOP · 选题 | 选题阶段 | 选择影片类型(连载微剧本/微电影/通用)；爆款众筹列表；题材库点选。✅ | filmType: serial/film/general；selectedTopic: string；crowdfund[], topicsByType{} | Demo · canvas · SOP 步骤0 |
| 画布 · SOP · 各阶段 | 阶段 Agent 执行 | 每阶段 Agent mock 执行产出；上一步/下一步；失败显示重试。✅ | current_step, failed_step, error_message；completed[] 布尔 | Demo · canvas · SOP 各步内容区 |
| 画布 · SOP · 断点续跑 | 失败重试 | 某阶段失败可点重试，从失败步恢复，保留已完成产物。✅ | failed_step + retry 动作 | Demo · canvas · 重试按钮 |
| 画布 · 自由画布 | 节点编排 | 节点面板 + 画布区；示例链：小说转剧本→分镜→生图→图生视频→场景调度。✅ | 节点 type/id/连线；示例 5 节点 | Demo · canvas · 自由模式 |
| 画布 · 计费 | 爆米花消耗 | 每次 AI/Agent 生成消耗爆米花 🍿；余额不足阻断并引导充值。🔶 | getCost 预估；余额字段 | Demo · canvas · 计费提示 |
| 资产 · Tab | 四类资产 Tab | Tab：角色库 / 场景库 / 模型库 / 我的审核。✅ | assetTab: role/scene/model/audit | Demo · assets · Tab |
| 资产 · 角色库 | 角色卡片 | 展示角色名、参考图、描述；供写作/画布引用。✅ | 角色 mock: name, avatar, desc | Demo · assets · 角色宫格 |
| 资产 · 场景库 | 场景卡片 | 展示场景名、预览图、标签。✅ | 场景 mock 数据 | Demo · assets · 场景 Tab |
| 资产 · 模型库 | 模型卡片 | 展示可用 AI 模型/LoRA 等配置项。✅ | 模型 mock 数据 | Demo · assets · 模型 Tab |
| 资产 · 我的审核 | 审核表格 | 表格列出待审资产/授权；操作：通过、打回。✅ | 审核行: 资产名, 类型, 提交人, 状态, 操作 | Demo · assets · 审核 Tab |
| 结算 · 概览三卡 | 收益概览 | 三卡：累计收益、已提现、可提现；可提现卡带「立即提现」按钮。✅ | 累计/已提现/可提现: number(元) | Demo · settlement · 概览三卡 |
| 结算 · 版权 Tab | 版权结算 | Tab 展示四维 breakdown(小说/剧本×已结/待结)+筛选 Tab+明细列表。✅ | copyrightSettleRows[]: { type, title, amount, status, date }；copyrightTab: all/novel/script/settled/pending | Demo · settlement · 版权 Tab |
| 结算 · 爆米花 Tab | 爆米花账户 | 展示余额构成(充值/赠送/赚取)；兑换、购买按钮；流水 Sub-Tab。✅ | popcornRecharge/Gift/Earned: number；popcornTransactions[] | Demo · settlement · 爆米花 Tab |
| 结算 · 提现记录 Tab | 提现记录表 | 表格：时间、金额、手续费、实际到账、方式、状态、备注。✅ | withdrawRecords[]: { time, amount, fee, actual, method, status, note } | Demo · settlement · 提现记录 |
| 结算 · 提现弹窗 | 发起提现 | 输入提现金额、选择支付宝/银行卡；提交后进入审核流程。✅ | withdrawAmount: number；withdrawMethod: string；withdrawableBalance: number | Demo · withdrawDialog |
| 结算 · 兑换弹窗 | 爆米花兑换 | 输入兑换爆米花数量，按 10:1 兑换为可提现余额；仅赚取部分可兑。✅ | exchangeAmount: number；exchangeRate: 10 | Demo · exchangeDialog |
| 个人空间 · Tab | 运行记录/设置 | Tab：运行记录、个人设置（目标态扩展 archives/interactions/tasks）。✅ | userSpaceTab: runs/settings | Demo · userspace · Tab |
| 个人空间 · 运行记录 | Agent 运行轨迹 | 按 Agent 类型分组展示历史运行列表：任务名、时间、状态、Token 消耗。✅ | userAgentRuns[]: { agent, task, time, status, tokens } | Demo · userspace · 运行记录 |
| 个人空间 · 个人设置 | 账号信息展示 | 展示头像、昵称、身份、邀请码、靓号、手机号；各项可点击编辑。✅ | userProfile: { nickname, avatar, identity, inviteCode, premiumInviteCode, phone, level, tier, points } | Demo · userspace · 设置区 |
| 个人空间 · 头像编辑 | 头像弹窗 | 从头像预设库选择或上传头像。✅ | profileAvatarPresets[]: { label, url } | Demo · profileAvatarDialog |
| 个人空间 · 昵称编辑 | 昵称弹窗 | 修改昵称，校验非空与长度。✅ | profileEditForm.nickname: string | Demo · profileNicknameDialog |
| 个人空间 · 手机编辑 | 手机号弹窗 | 修改手机号+短信验证码。✅ | phone, smsCode: string | Demo · profilePhoneDialog |
| 个人空间 · 密码编辑 | 密码弹窗 | 旧密码+新密码+确认密码。✅ | oldPassword, newPassword, confirmPassword | Demo · profilePasswordDialog |
| 个人空间 · 扩展模块 | 存档/互动/任务 | 目标态渲染：历史存档、点赞收藏、积分任务、资产分组等（Demo 数据已有 UI 未渲染）。⬜ | userArchives[], userSpaceTasks[], userInteractionGroups[] 等 | 待补截图 |
| 教程 · 侧栏导航 | 文档目录 | 左侧 6 项 docNav：产品介绍、快速开始、创作指南、功能说明、社群玩法、FAQ。✅ | docNav[]: { key, label, icon }；tutorialDocKey: string | Demo · tutorial · 左栏 |
| 教程 · 文档内容 | 帮助正文 | 右侧展示对应文档标题、段落、步骤列表；支持锚点切换。✅ | 各 doc section 静态内容 | Demo · tutorial · 右栏正文 |
| 消息 · 消息列表 | 站内消息 | 沿用现有小提大作消息模式；展示审核、授权、结算、互动类通知。🔶 | 消息 type, title, content, read, time | Demo · message · 占位页 |
| 联系 · 商务表单 | 商务合作申请 | 弹窗表单：身份(企业/个人)、团队名、制作经验、制作类型、团队规模、手机、微信。✅ | contactForm: { identityType, teamName, productionExperience, productionTypes[], teamSize, mobile, wechatId } | Demo · contactDialog · 表单 |
| 联系 · 提交成功 | 二维码展示 | 提交后展示商务对接二维码。✅ | contactQrCodeUrl: url；contactStep: form/success | Demo · contactDialog · 成功态 |
| 底部 · 爆米花快捷 | 跳转爆米花 Tab | 点击底部爆米花图标跳转结算页并定位爆米花 Tab；显示今日待领角标。✅ | goSettlementPopcorn() | Demo · rail-footer · 爆米花 |
| 隐藏页 · 首页 | Legacy 首页 | Hero+最近项目(漫剧/写作 Tab)+4 统计卡(作品/AI生成/收益/分佣)。✅ | homeTab: manhua/writing；banners[], recentManhua[], recentWriting[] | Demo · home（无 nav 入口） |
| 隐藏页 · 交易市场 | 市场 Tab | 三 Tab：作品市场/工作流市场/知识库市场；卡片展示价格与购买/订阅/授权按钮。⬜ | marketTab: works/workflows/kbs；各 market 列表 mock | Demo · market |
| 隐藏页 · 数据看板 | 收入看板 | 展示月收入、播放分成、邀请分佣、用量统计等。⬜ | dataTab: dashboard；看板指标 mock | Demo · data · 看板 Tab |
| 隐藏页 · 结算明细 | 分成明细 | 展示分成规则、结算周期、明细行。⬜ | settleRows[] | Demo · data · 明细 Tab |
| 隐藏页 · 发票 | 开票申请 | 发票 Tab+invoiceDialog：抬头管理、开票金额、普票/专票、状态跟踪。⬜ | 发票字段待财税确认 | Demo · data · 发票 Tab |
| 隐藏页 · 指挥舱 | G0-G9 看板 | Pro/团队版 Kanban：G0 立项~G9 复盘；每 Gate 任务数/健康度/待质检/被打回。⬜ | gates[]: { key, label, dept, tasks, qc, rejected, avgStay, health } | Demo · command |
| 隐藏页 · 设置 | 导出偏好 | 选择导出格式偏好：仅剧本 / 剧本+分镜。⬜ | exportPref: script/board | Demo · settings |
| 隐藏页 · 影片MV | MV 模板入口 | 6 个 MV 模板卡片，点击跳转画布。⬜ | musicmv 模板列表 | Demo · musicmv |

---

## 附录 A · 文创小说字段（cpBooks）

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | string | 书籍唯一 ID，如 book-1 |
| title | string | 书名 |
| author | string | 作者 |
| coverUrl | string | 封面图 URL |
| copyrightOwner | string | 版权方名称 |
| providerId | string | 版权方 ID |
| preference | string | 偏好：男频/女频 |
| longShort | string | 篇幅：短篇/长篇 |
| category | string | 类型：古言/玄幻/都市等 |
| wordCount | number | 字数 |
| isComplete | boolean | 是否完结 |
| exclusiveType | number | 0 非独家 / 1 独家 / 2 双轨 |
| exclusiveLabel | string | 独家类型展示文案 |
| cooperation | array | 合作方式列表 |
| shelfDate | datetime | 上架时间 |
| maxProductionRevenue | number/null | 预估制作收益上限 |
| qrCodeUrl | string | 商务二维码 |

---

## 附录 B · WWDS 剧本详情字段

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | string | 剧本 ID |
| title | string | 剧本名 |
| tags | string[] | 标签 |
| rating | string | 评级如 A/B |
| finalScore | number | 综合分 |
| scores.w/i/h/g/r/v | number | 六维得分 |
| subjectType | string | 题材类型 |
| estimatedChars | number | 预估字数 |
| targetPlatform | string | 目标平台 |
| adaptation | object | 各媒介改编分 |
| audience | object | 受众画像 |
| risk | object | 四维风险 |
| report | markdown | 完整报告 |

---

## 附录 C · 产品链路（可复制到文档）

```
游客引流（大赏/教程）
  → 注册登录
  → 创作（写作🌽 / 画布SOP🍿 / 工具链）
  → 资产沉淀（角色/场景/Agent）
  → 文创确权（小说/剧本版权库）
  → 交易变现（市场·目标态）
  → 大赏曝光复盘
  → 结算（版权+爆米花+提现）
  → 邀请分佣裂变
```

---

*生成时间：2026-07-06 · 共 72 行功能条目*
