/** 一级菜单页面需求说明默认内容（Workflow C 原型推断） */
window.PAGE_REQ_SPECS = {
  showcase: {
    title: '影片大赏',
    mainFunctions: '作品展示广场与创作社区入口。展示 IP 与影片成片，支持按类型/作者/标题筛选，承载引流与「可复盘创作过程」的价值主张。',
    functionPoints: '- Hero 轮播：展示精选影片/IP 主视觉与 Slogan\n- 作品筛选：类型、作者名称、标题多条件组合搜索\n- 作品卡片流：封面、作者头像、标题、简介、元信息\n- 作者信息：昵称、VIP 标识、属地/标签\n- 左右切换 Hero 幻灯',
    fields: '- showcaseSearch.type：类型（文本）\n- showcaseSearch.author：作者名称（文本）\n- showcaseSearch.title：标题（文本）\n- 作品卡片：n（标题）、author、avatar、cover、desc、meta、vip\n- Hero：showcaseHeroSlides[]、showcaseHeroIdx',
    rules: '- 筛选为前端即时过滤，空条件展示全部\n- 卡片封面缺失时使用渐变占位\n- Hero 轮播可手动切换，索引循环\n- 作品数据来源于大赏内容池（Demo 为静态样例）',
    interactions: '- 点击 Hero 左右箭头：切换轮播图\n- 输入筛选条件：实时过滤 poster-grid\n- 点击作品卡片：❓ 详情/复盘页跳转待产品确认\n- 点击作者头像/昵称：❓ 进入作者主页待确认',
  },
  prompts: {
    title: '共享 Agent',
    mainFunctions: '提示词与工作流资产库。按封面/视频/写作/剧本分类浏览、搜索、选用共享 Agent 提示词，支撑专业创作场景。',
    functionPoints: '- 一级类型 Tab：封面 / 视频 / 写作 / 剧本\n- 二级分类 Chips：各类型下内容小类\n- 关键字搜索：跨当前类型过滤\n- 卡片流展示：封面图、免费/付费标识、Hover 详情\n- 选中态：高亮当前卡片\n- 历史记录入口（Demo 占位）',
    fields: '- promptMode：cover | video | writing | script\n- promptSubKey：二级分类 key\n- promptSearch：搜索关键字\n- selectedPromptId：当前选中项\n- 卡片：id、title、cover、category、description、paid 等',
    rules: '- 切换一级 Tab 重置或保留二级分类按产品策略（Demo 保留 subKey 若存在）\n- 搜索为空时展示当前分类全部条目\n- 无数据时显示「当前分类暂无内容」空态\n- 付费/免费角标由 item 属性决定',
    interactions: '- 点击类型 Tab：switchPromptMode\n- 点击分类 Chip：切换 promptSubKey\n- 输入搜索框：过滤 promptStreamItems\n- 点击卡片：selectPromptItem 选中\n- Hover 卡片：展示标题/分类/描述浮层\n- 点击历史记录：Demo 提示交互',
  },
  copyright: {
    title: '文创版权',
    mainFunctions: '版权中心统一入口：小说版权库、剧本库、排行榜、剧本详情评估报告、确权挂牌与授权合作。',
    functionPoints: '- 落地页 Tab：小说版权 / 剧本版权\n- 小说筛选：书名、版权方、偏好、篇幅、类型、完结状态\n- 剧本库列表与详情：六维评分、改编潜力、申领\n- 排行榜横向滚动\n- 一键确权挂牌入口（关联写作/画布）\n- 商务咨询/申领弹窗（二维码）',
    fields: '- cpMainTab：novel | script\n- cpNovelQuery / cpScriptQuery：筛选字段\n- cpScriptDetailId：详情页剧本 ID\n- cpScriptDetailTab：overview | adaptation | …\n- 列表项：书名、版权方、封面、评级、分数等',
    rules: '- 离开版权页清除剧本详情 ID\n- 详情页不存在显示空态\n- 筛选/排序为前端过滤 Demo 数据\n- 申领/咨询需展示联系二维码\n- 排行榜左右滚动边界禁用按钮',
    interactions: '- Tab 切换：小说/剧本库\n- 筛选查询：刷新列表\n- 点击剧本卡片：进入详情 cpScriptDetailId\n- 详情 Tab：锚点滚动到对应 section\n- 申领剧本：打开二维码弹窗\n- 返回：cpBackFromScriptDetail',
  },
  tools: {
    title: '工具',
    mainFunctions: '对齐大作联盟 ideas 工具箱。提供剧本评估、剧本拆解等即用型 AI 工具入口，粘贴链接或输入即可生成可复制结果。',
    functionPoints: '- 工具卡片网格：封面、序号、名称、描述、使用人数\n- 点击进入独立工具页或弹窗\n- 剧本评估（script-eval）：模型/质量标准/报告\n- 剧本拆解（script-breakdown）：分集/场景/台词结构\n- 其它链接型工具：弹窗输入 + 生成结果',
    fields: '- workbenchTools[]：id、title、desc、cover、users\n- 工具页：toolLink、toolResult、scriptEvalModel 等\n- 卡片序号：从 01 递增',
    rules: '- 工具按配置列表渲染，无数据不展示\n- 使用中禁止重复提交（toolRunning 锁）\n- 子工具页通过 active 路由区分\n- 使用人数格式化展示（万/千）',
    interactions: '- 点击工具卡片：openTool → 弹窗或 go 子页\n- 剧本评估/拆解：独立全屏工作区\n- 返回工具：go(\'tools\')\n- 生成结果：支持复制、提交审核（Demo）',
  },
  projects: {
    title: '创作',
    mainFunctions: '项目工作台与「大作创建」入口。Banner 引流、最近项目网格、按漫剧/写作/通用 Tab 切换，快速进入画布或写作。',
    functionPoints: '- 3D Banner 轮播：品牌活动与行动号召\n- 最近项目区：Tab 切换 film / writing / general\n- 项目卡片网格：封面、名称、编码、更新时间\n- 新建卡片：跳转画布或写作\n- 全部项目弹窗（列表视图）',
    fields: '- projTab：film | writing | general\n- currentGridProjects[]：id、name、cover、link、code、date\n- projBanners[]：img、brand、sub、cta、action\n- projCreateConfig：当前 Tab 对应创建入口',
    rules: '- Tab 切换改变项目数据源与创建入口\n- 卡片点击跳转 link 或默认 create 配置\n- Banner CTA 可配置 go 目标\n- 空项目仍展示「开始创作」占位卡',
    interactions: '- Banner 轮播自动播放，点击 CTA 跳转\n- Tab 点击：切换 projTab\n- 点击项目卡：go(link)\n- 点击开始创作：go(canvas/writing)\n- 全部项目：打开 projListDialog',
  },
  assets: {
    title: '创作资产',
    mainFunctions: '写作与画布共享素材库。管理角色、场景、模型资产及审核事项，支撑创作一致性。',
    functionPoints: '- Tab：角色库 / 场景库 / 模型库 / 我的审核\n- 角色卡片：缩略图、名称、锁定状态、参考图数量\n- 场景/模型：空态占位说明\n- 审核列表：事项、类型、状态、通过/打回操作',
    fields: '- assetTab：role | scene | model | audit\n- 角色示例：名称、封面 gradient\n- 审核行：n（事项）、t（类型）、s（状态）',
    rules: '- 资产在写作与画布间共享\n- 审核中事项需展示 warning 状态 Tag\n- 通过/打回为行内操作（Demo 无后端）\n- 空库使用 el-empty 说明文案',
    interactions: '- Tab 切换：assetTab\n- 点击角色卡：❓ 进入详情/编辑待确认\n- 审核通过/打回：interact 或占位按钮\n- 场景/模型 Tab：展示示例空态',
  },
  settlement: {
    title: '结算中心',
    mainFunctions: '汇集版权收益、爆米花虚拟货币与提现记录。支持余额概览、明细筛选、兑换与提现发起。',
    functionPoints: '- 顶部概览：累计收益、已提现、可提现余额\n- Tab：版权结算 / 爆米花 / 提现记录\n- 版权结算：小说/剧本 已结/待结拆分 + 列表筛选\n- 爆米花：余额、充值/赠送/赚取构成、交易明细\n- 提现记录表格：金额、手续费、到账方式、状态',
    fields: '- settlementTab：copyright | popcorn | withdraw\n- copyrightTab / popcornTab：明细筛选\n- settlementHeader：totalEarnings、withdrawn\n- withdrawableBalance：可提现余额\n- 明细行：workName、type、amount、status、time 等',
    rules: '- 版权 Tab 内嵌 copyrightTabs 二次筛选\n- 爆米花支持兑换为元、立即购买入口\n- 提现需校验余额（弹窗）\n- 状态 Tag：已结算 success / 待结算 warning / 已拒绝 danger\n- 左侧栏爆米花入口跳转 settlementTab=popcorn',
    interactions: '- Tab 切换：settlementTab\n- 立即提现：withdrawDialog\n- 兑换为元：exchangeDialog\n- 立即购买：openPurchaseFlow\n- 版权/爆米花子 Tab：过滤列表\n- 表格展示提现流水与备注',
  },
};

window.PAGE_REQ_SECTIONS = [
  { key: 'mainFunctions', label: '主要功能' },
  { key: 'functionPoints', label: '功能点' },
  { key: 'fields', label: '字段' },
  { key: 'rules', label: '需求规则' },
  { key: 'interactions', label: '交互' },
];

window.PAGE_REQ_STORAGE_PREFIX = 'aixt-demo-page-req:';
