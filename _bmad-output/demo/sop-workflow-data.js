/** SOP 画布流水线 · 题材/风格选项与 Demo 产物 */
window.SOP_WORKFLOW_DATA = {
  filmTypes: [
    { key: 'film', label: '微电影' },
    { key: 'serial', label: '连载微剧' },
    { key: 'mv', label: 'MV' },
    { key: 'video', label: '影片' },
  ],
  genreTags: [
    '都市', '爱情', '喜剧', '悬疑', '古装', '剧情', '动作', '武侠', '仙侠', '冒险',
    '战争', '科幻', '奇幻', '惊悚', '恐怖', '灾难', '历史', '谍战', '年代', '刑侦/犯罪',
    '医疗', '律政', '商战', '校园', '传记',
  ],
  styleTags: [
    '3D韩漫', '中国古风', '日系二次元', '美漫英雄风', '欧式油画风', '水墨丹青', '工笔重彩', '浮世绘风',
    '赛博朋克', '蒸汽波', '暗黑哥特', '甜美洛丽塔', '清新水彩', '厚涂写实', '平涂动漫', '赛璐璐经典',
    '像素复古', '剪纸艺术', '皮影戏韵', '木偶定格', '粘土动画', '素描速写', '粉彩柔和', '版画刻痕',
    '涂鸦街头', '波普艺术', '极简主义', '几何构成', '装饰艺术', '新艺术运动', '巴洛克华丽', '洛可可精致',
    '东方玄幻', '仙侠飘逸', '武侠江湖', '科幻硬核', '末日废土', '蒸汽朋克', '柴油朋克', '生物朋克',
    '克苏鲁恐怖', '悬疑黑色（Noir）', '浪漫青春', '校园清新', '职场精英', '古风宫廷', '民国风情',
    '现代简约', '运动热血', '美食诱人',
  ],
  demoTopics: [
    { id: 1, title: '雨棚下的名单', hook: '暴雨夜，一份未送达的名单改写三条命运', genre: '悬疑', filmType: '微电影' },
    { id: 2, title: '义体改造师的最后订单', hook: '赛博都市里，改造师发现客户记忆被植入', genre: '科幻', filmType: '连载微剧' },
    { id: 3, title: '一夜封神', hook: '落魄主播意外触发国运副本，全球直播', genre: '都市', filmType: '影片' },
  ],
  demoStyleImages: [
    { id: 1, name: '赛博朋克', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=480&q=80', desc: '霓虹雨夜 · 高对比 · 冷蓝主调' },
    { id: 2, name: '中国古风', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=480&q=80', desc: '工笔淡彩 · 留白构图 · 东方意境' },
    { id: 3, name: '厚涂写实', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=480&q=80', desc: '电影级光影 · 浅景深 · 情绪特写' },
  ],
  demoScript: {
    title: '雨棚下的名单 · 第一集',
    scenes: [
      { id: 's1', label: '第一场 · 雨夜天台', text: '【外景 · 雨夜 · 天台】\n\n暴雨如注。林晚（女，28，调查记者）攥着一份湿透的名单，名单上三个名字被红笔圈出。\n\n林晚（OS）：他们都说名单是假的……可为什么每个名字旁边，都标着同一个时间——今晚 23:47？\n\n远处警笛由远及近。林晚将名单塞入防水袋，转身消失在雨幕中。' },
      { id: 's2', label: '第二场 · 旧货仓', text: '【内景 · 旧货仓 · 夜】\n\n昏黄灯泡摇晃。陈默（男，35，前刑警）用镊子夹起名单碎片，碎片边缘有烧灼痕迹。\n\n陈默：这不是意外烧毁，是有人不想让人看清第三个名字。\n\n林晚：你认识名单上的人？\n\n陈默（沉默片刻）：认识。其中一个，是我。' },
      { id: 's3', label: '第三场 · 雨棚下', text: '【外景 · 公交雨棚 · 夜】\n\n两人对峙。名单在闪电下展开——第三个名字缓缓浮现：「周衡」。\n\n林晚：周衡……他不是三年前就「意外」坠楼了吗？\n\n陈默：所以这份名单不是死亡通知，是「召回令」。\n\n（切至黑屏，字幕：23:47 之前，找到第四个人。）' },
    ],
  },
  demoStoryboard: [
    { seq: 1, chars: '林晚', props: '名单、防水袋', duration: '4s', content: '【大全景】暴雨天台，林晚逆光站立，名单特写叠化红圈名字' },
    { seq: 2, chars: '林晚', props: '警笛（音效）', duration: '3s', content: '【跟拍】林晚冲入雨幕，镜头 handheld 制造压迫感' },
    { seq: 3, chars: '陈默', props: '镊子、名单碎片', duration: '5s', content: '【中景】货仓暖光，陈默审视烧灼痕迹，浅景深' },
    { seq: 4, chars: '林晚、陈默', props: '名单', duration: '6s', content: '【双人中景】对话推进，名单作为视觉锚点居中' },
    { seq: 5, chars: '林晚、陈默', props: '闪电（特效）', duration: '4s', content: '【特写】闪电照亮「周衡」名字，音效骤停 0.5s' },
    { seq: 6, chars: '—', props: '字幕卡', duration: '3s', content: '【黑场】字幕：23:47 之前，找到第四个人。' },
  ],
  demoCharacters: [
    {
      seq: 1, name: '林晚', role: '主角', shots: '1,2,4,5',
      desc: '28岁调查记者，高马尾、风衣+记者证，眼神警觉 · 三视图+表情参考已生成',
      refImg: 'assets/sop-char-ref-female.png',
      sheetImg: 'assets/sop-char-ref-female.png',
      charImg: 'assets/sop-char-ref-female.png',
      views: {
        front: { label: '正面', bgPos: '72% 42%', bgScale: 180 },
        side: { label: '侧面', bgPos: '22% 58%', bgScale: 220 },
        back: { label: '背面', bgPos: '10% 28%', bgScale: 240 },
      },
      expressions: [
        { label: '默认', bgPos: '62% 12%', bgScale: 320 },
        { label: '侧颜', bgPos: '18% 55%', bgScale: 380 },
        { label: '四分之三', bgPos: '28% 58%', bgScale: 360 },
        { label: '全身正面', bgPos: '72% 42%', bgScale: 180 },
      ],
      pose3d: { yaw: 0, pitch: 0, roll: 0, zoom: 1, lightAz: 135, lightEl: 40, camDist: 50, focal: 85 },
      activeView: 'front',
      activeExpr: null,
    },
    {
      seq: 2, name: '陈默', role: '主角', shots: '3,4,5',
      desc: '35岁前刑警，高束发、暗色战袍，左颊旧疤 · 三视图+表情参考已生成',
      refImg: 'assets/sop-char-ref-male.png',
      sheetImg: 'assets/sop-char-ref-male.png',
      charImg: 'assets/sop-char-ref-male.png',
      views: {
        front: { label: '正面', bgPos: '78% 50%', bgScale: 165 },
        side: { label: '侧面', bgPos: '22% 38%', bgScale: 200 },
        back: { label: '背面', bgPos: '38% 38%', bgScale: 200 },
      },
      expressions: [
        { label: '默认', bgPos: '22% 18%', bgScale: 280 },
        { label: '侧颜', bgPos: '12% 38%', bgScale: 320 },
        { label: '严肃', bgPos: '22% 72%', bgScale: 300 },
        { label: '怒意', bgPos: '38% 72%', bgScale: 300 },
      ],
      pose3d: { yaw: 0, pitch: 0, roll: 0, zoom: 1, lightAz: 120, lightEl: 35, camDist: 55, focal: 80 },
      activeView: 'front',
      activeExpr: null,
    },
    {
      seq: 3, name: '周衡', role: '关键人物', shots: '5',
      desc: '回忆闪回人物，西装革履 · 仅侧脸与背影出镜',
      refImg: 'assets/sop-char-ref-male.png',
      sheetImg: 'assets/sop-char-ref-male.png',
      charImg: 'assets/sop-char-ref-male.png',
      views: {
        front: { label: '正面', bgPos: '78% 50%', bgScale: 165 },
        side: { label: '侧面', bgPos: '12% 38%', bgScale: 220 },
        back: { label: '背面', bgPos: '38% 38%', bgScale: 200 },
      },
      expressions: [
        { label: '侧颜', bgPos: '12% 38%', bgScale: 320 },
        { label: '低眉', bgPos: '22% 55%', bgScale: 280 },
        { label: '背影', bgPos: '38% 38%', bgScale: 200 },
      ],
      pose3d: { yaw: 90, pitch: 0, roll: 0, zoom: 1, lightAz: 90, lightEl: 30, camDist: 60, focal: 90 },
      activeView: 'side',
      activeExpr: null,
    },
  ],
  /** 九宫格摄影机矩阵 · 场景一致性生成规范 */
  sceneCameraMatrixTemplate: [
    { label: '正面全景', desc: '正面全景，人眼高度主视角，完整展示建筑整体形态', defaultBgPos: '50% 45%', defaultBgScale: 100 },
    { label: '正面近景', desc: '正面近景，镜头靠近主体，重点展示入口、中轴线与建筑细节', defaultBgPos: '50% 55%', defaultBgScale: 185 },
    { label: '侧面全景', desc: '侧面全景，展示建筑侧向体量关系，表现整体轮廓与空间纵深', defaultBgPos: '25% 45%', defaultBgScale: 115 },
    { label: '侧面近景', desc: '侧面近景，补充建筑侧向细节，展示立面设计与结构层级', defaultBgPos: '20% 60%', defaultBgScale: 195 },
    { label: '背面全景', desc: '背面全景，反向机位，完整展示建筑背面结构与布局', defaultBgPos: '75% 45%', defaultBgScale: 110 },
    { label: '背面近景', desc: '背面近景，重点展示背部建筑细节，表现隐藏空间与装饰系统', defaultBgPos: '80% 58%', defaultBgScale: 190 },
    { label: '俯视全景', desc: '俯视全景，高空鸟瞰视角，展示整体规划布局与空间组织', defaultBgPos: '50% 20%', defaultBgScale: 130 },
    { label: '俯视近景', desc: '俯视近景，聚焦主体建筑群，展示屋顶结构与空间细节', defaultBgPos: '50% 15%', defaultBgScale: 210 },
    { label: '斜向英雄', desc: '斜向高位视图，45°高位鸟瞰机位，同时展示立面与总体布局，作为总览英雄视角', defaultBgPos: '35% 30%', defaultBgScale: 125 },
  ],
  sceneCameraParamsText: '统一焦段 50mm 镜头 · 统一曝光参数 · 统一白平衡 · 统一动态范围 · 统一景深 · 统一色彩风格 · 统一构图逻辑 · 统一视觉语言',
  sceneQualityPromptText: '建筑摄影 · 建筑可视化 · 建筑设计方案展示 · ArchViz Presentation Board · 建筑竞赛级表现图 · 商业广告级视觉 · 电影级环境设计 · 博物馆级展示效果 · 超高清 8K · HDR · 超高分辨率 · 极致锐度 · 真实建筑材质 · PBR 材质系统 · 空间层次丰富 · 超清晰细节 · 统一渲染质量',
  buildSceneCameraGrid(baseImg, overrides) {
    return (window.SOP_WORKFLOW_DATA.sceneCameraMatrixTemplate || []).map((m, i) => ({
      key: 'cam-' + i,
      label: m.label,
      desc: m.desc,
      img: baseImg,
      bgPos: (overrides && overrides[i] && overrides[i].bgPos) || m.defaultBgPos,
      bgScale: (overrides && overrides[i] && overrides[i].bgScale) || m.defaultBgScale,
    }));
  },
  demoScenes: [
    {
      seq: 1, name: '暴雨天台', shots: '1,2',
      desc: '城市天际线背景，霓虹反射积水，冷蓝主调 · ArchViz 九宫格已生成',
      baseImg: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=85',
      refImg: '',
    },
    {
      seq: 2, name: '旧货仓', shots: '3,4',
      desc: '昏黄灯泡、货架纵深、尘埃颗粒感 · 工业空间九宫格',
      baseImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
      refImg: '',
    },
    {
      seq: 3, name: '公交雨棚', shots: '5,6',
      desc: '雨帘前景、闪电背光、名单作为视觉焦点 · 街道场景九宫格',
      baseImg: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=1200&q=85',
      refImg: '',
    },
  ],
};

/** 为 Demo 场景注入九宫格与 3D 参数 */
(function () {
  const D = window.SOP_WORKFLOW_DATA;
  D.demoScenes = D.demoScenes.map(function (s) {
    const grid = D.buildSceneCameraGrid(s.baseImg);
    return Object.assign({}, s, {
      sheetImg: s.baseImg,
      sceneImg: s.baseImg,
      cameraGrid: grid,
      pose3d: { yaw: 0, pitch: -12, roll: 0, zoom: 1, focal: 50, exposure: 0, wb: 5600, dof: 8, camDist: 55 },
      activeCam: 'cam-0',
      activeCamFree: false,
    });
  });
})();
