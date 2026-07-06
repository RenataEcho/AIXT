(function () {
  const COVER = (seed, w = 360, h = 480) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
  const LOCAL_COVER = (n) => `assets/copyright-covers/book-${String(n).padStart(2, '0')}.jpg`;

  const providers = [
    { id: '', providerName: '全部版权方', logoUrl: '' },
    { id: 'provider-shuimu', providerName: '水母故事会', logoUrl: '' },
  ];

  // 小提大作线上「文创版权 · 小说版权」真实书目（封面取自 aixtdz.com 页面截图）
  const rawBooks = [
    { title: '舌战侯门：女王开麦', author: '柳树', category: '古言', pref: '女频', len: '短篇', year: 2025, words: 680000, cover: LOCAL_COVER(1) },
    { title: '曹丕：朕真没想杀弟弟', author: '柳树', category: '历史', pref: '男频', len: '短篇', year: 2025, words: 720000, cover: LOCAL_COVER(2) },
    { title: '流放海岛？我打造古代马尔代夫', author: '谷月', category: '古言', pref: '女频', len: '短篇', year: 2025, words: 560000, cover: LOCAL_COVER(3) },
    { title: '穿越古代，我的封地藏不住了', author: '轻风', category: '玄幻', pref: '男频', len: '长篇', year: 2024, words: 1280000, cover: LOCAL_COVER(4) },
    { title: '和前任双穿了：他在古代打渔，我靠厨艺暴富', author: '荒荒', category: '古言', pref: '女频', len: '短篇', year: 2025, words: 480000, cover: LOCAL_COVER(5) },
    { title: '末日后，我家绝育猫变成巨兽了', author: '叶紫', category: '末世', pref: '女频', len: '短篇', year: 2025, words: 520000, cover: LOCAL_COVER(6) },
    { title: 'Ava and her cat', author: '叶紫', category: '末世', pref: '女频', len: '短篇', year: 2025, words: 510000, cover: LOCAL_COVER(7) },
    { title: '开局一盏宝莲灯，妖女废丹都是大补', author: '金鱼', category: '玄幻', pref: '男频', len: '长篇', year: 2024, words: 960000, cover: LOCAL_COVER(8) },
    { title: '国师缝命我拆衣', author: '小羊', category: '古言', pref: '女频', len: '短篇', year: 2025, words: 440000, cover: LOCAL_COVER(9) },
    { title: '全网嘲笑嘉豪男，一剑斩天惊呆国家队', author: '山雀', category: '都市', pref: '男频', len: '短篇', year: 2025, words: 620000, cover: LOCAL_COVER(10) },
  ];

  const rankTitles = rawBooks.slice(0, 6).map(b => b.title);
  const rankAuthors = rawBooks.slice(0, 6).map(b => b.author);
  const rankPlatforms = ['抖音', '红果短剧', '腾讯视频', '快手', 'Bilibili', '芒果 TV'];
  const playCounts = [428000000, 356000000, 289000000, 245000000, 198000000, 176000000, 152000000, 128000000, 96000000, 82000000];

  function pad(n) { return String(n).padStart(2, '0'); }
  function shelfDate(year, idx) {
    const m = (idx % 12) + 1;
    const d = (idx % 27) + 1;
    return `${year}-${pad(m)}-${pad(d)} 10:00:00`;
  }
  function exclusiveType(idx) { return idx % 3 === 0 ? 2 : idx % 2 === 0 ? 1 : 0; }
  function price(idx) { return idx % 4 === 0 ? 0 : [19999, 29999, 49999, 89999][idx % 4]; }
  function shareRatio(idx) { return idx % 4 === 0 ? 30 : idx % 3 === 0 ? 25 : 0; }

  function buildCooperationLines(priceVal, ratio) {
    const lines = [];
    if (priceVal > 0) {
      const text = priceVal >= 10000
        ? `¥${(priceVal / 10000).toFixed(priceVal % 10000 === 0 ? 0 : 1).replace(/\.0$/, '')}w`
        : `¥${priceVal.toLocaleString('zh-CN')}`;
      lines.push({ kind: 'price', text });
    }
    if (ratio > 0) lines.push({ kind: 'shareRatio', text: '分成比例：', value: `${ratio}%` });
    if (!lines.length) lines.push({ kind: 'inquiry', text: '询价' });
    return lines;
  }

  function buildCooperation(exType, priceVal, ratio) {
    const lines = buildCooperationLines(priceVal, ratio);
    const items = [];
    if (exType === 1 || exType === 2) items.push({ label: '独家', lines });
    if (exType === 0 || exType === 2) items.push({ label: '非独家', lines });
    return items;
  }

  function exclusiveLabel(t) {
    return t === 0 ? '非独家' : t === 1 ? '独家' : '独家 / 非独家';
  }

  const books = rawBooks.map((b, i) => {
    const prov = providers[1];
    const ex = exclusiveType(i);
    const p = price(i);
    const sr = shareRatio(i);
    return {
      id: `book-${i + 1}`,
      title: b.title,
      author: b.author,
      coverUrl: b.cover || COVER(`book-${i + 1}`),
      copyrightOwner: prov.providerName,
      providerId: prov.id,
      preference: b.pref,
      longShort: b.len,
      category: b.category,
      wordCount: b.words,
      isComplete: true,
      exclusiveType: ex,
      exclusiveLabel: exclusiveLabel(ex),
      cooperation: buildCooperation(ex, p, sr),
      shelfDate: shelfDate(b.year, i),
      estimatedCompletionDate: undefined,
      maxProductionRevenue: i === 0 ? 880000 : i === 3 ? 1200000 : null,
      qrCodeUrl: 'https://xtimage.d1gjrkj.com/xtdz/image/20260618/855521803985309696.jpg',
    };
  });

  const wwds = window.WWDS_SCRIPT_DATA || { records: [], details: {} };
  const scripts = wwds.records || [];

  const scriptScoreDims = [
    { key: 'w', label: 'W 世界观', desc: '设定底色' },
    { key: 'i', label: 'I 人设', desc: '主体色' },
    { key: 'h', label: 'H 钩子', desc: '高光色' },
    { key: 'g', label: 'G 金手指', desc: '强调色' },
    { key: 'r', label: 'R 关系', desc: '配色方案' },
    { key: 'v', label: 'V 氛围', desc: '饱和度' },
  ];
  const scriptAdaptDims = [
    { key: 'shortDrama', label: '短剧' },
    { key: 'comic', label: '漫画' },
    { key: 'audio', label: '有声' },
    { key: 'game', label: '游戏' },
    { key: 'filmTv', label: '影视' },
  ];
  const scriptRiskDims = [
    { key: 'policy', label: '政策风险' },
    { key: 'saturation', label: '市场饱和度' },
    { key: 'character', label: '人设兼容性' },
    { key: 'update', label: '稳定更新' },
  ];
  const scriptDetailTabs = [
    { key: 'overview', label: '概览' },
    { key: 'adaptation', label: '改编潜力' },
    { key: 'audience', label: '受众与风险' },
    { key: 'report', label: '完整报告' },
  ];

  function roundScore(n) {
    return typeof n === 'number' ? Math.round(n) : 0;
  }

  function getScriptDetail(id) {
    const key = String(id || '');
    return (wwds.details && wwds.details[key]) || null;
  }

  function filterWwdsScripts(list, query) {
    const q = String((query && query.bookName) || '').trim().toLowerCase();
    if (!q) return list;
    return list.filter(item => {
      const title = String(item.title || '').toLowerCase();
      const tags = (item.tags || []).join(' ').toLowerCase();
      return title.includes(q) || tags.includes(q);
    });
  }

  function renderMarkdown(source) {
    if (!source) return '';
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    const lines = String(source).split('\n');
    let html = '';
    let inUl = false;
    const closeUl = () => { if (inUl) { html += '</ul>'; inUl = false; } };
    lines.forEach(raw => {
      const line = raw.trimEnd();
      if (!line.trim()) { closeUl(); return; }
      if (line.startsWith('# ')) { closeUl(); html += `<h1>${inline(line.slice(2))}</h1>`; return; }
      if (line.startsWith('## ')) { closeUl(); html += `<h2>${inline(line.slice(3))}</h2>`; return; }
      if (line.startsWith('### ')) { closeUl(); html += `<h3>${inline(line.slice(4))}</h3>`; return; }
      if (line === '---') { closeUl(); html += '<hr>'; return; }
      if (line.startsWith('- ')) {
        if (!inUl) { closeUl(); html += '<ul>'; inUl = true; }
        html += `<li>${inline(line.slice(2))}</li>`;
        return;
      }
      closeUl();
      html += `<p>${inline(line)}</p>`;
    });
    closeUl();
    return html;
  }

  function scriptRadarPoints(scores, size) {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.34;
    return scriptScoreDims.map((d, i) => {
      const angle = (Math.PI * 2 * i) / scriptScoreDims.length - Math.PI / 2;
      const ratio = (Number(scores && scores[d.key]) || 0) / 100;
      return `${cx + Math.cos(angle) * r * ratio},${cy + Math.sin(angle) * r * ratio}`;
    }).join(' ');
  }

  function scriptRadarGrid(size, level) {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.34 * level;
    return scriptScoreDims.map((d, i) => {
      const angle = (Math.PI * 2 * i) / scriptScoreDims.length - Math.PI / 2;
      return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
    }).join(' ');
  }

  const ranking = rankTitles.map((title, i) => ({
    id: `mock-ranking-${i + 1}`,
    rank: i + 1,
    title,
    author: rankAuthors[i % rankAuthors.length],
    coverUrl: rawBooks[i] ? rawBooks[i].cover : COVER(`manga-rank-${i + 1}`),
    platform: rankPlatforms[i % rankPlatforms.length],
    playCount: playCounts[i],
    hongguoHeat: i + 1,
  }));

  const filterOptions = {
    channelOptions: ['全部', '端原生', '超前点播'],
    preferenceOptions: ['全部偏好', '男频', '女频', '通用'],
    longShortOptions: ['全部篇幅', '长篇', '短篇'],
    categoryOptions: ['全部类型', '古言', '历史', '玄幻', '末世', '都市', '科幻', '悬疑', '言情'],
    completionStatusOptions: ['全部状态', '完本', '未完本'],
  };

  function formatWordCount(n) {
    if (n == null) return '--';
    if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
    return String(n);
  }

  function formatPlayCount(n) {
    if (n == null) return '--';
    if (n >= 1e8) return `${(n / 1e8).toFixed(2)} 亿`;
    if (n >= 1e4) return `${(n / 1e4).toFixed(1)} 万`;
    return n.toLocaleString('zh-CN');
  }

  function formatShelfDate(s) {
    if (!s) return '--';
    return String(s).replace('T', ' ').substring(0, 16);
  }

  function formatRevenue(n) {
    if (!n || n <= 0) return '';
    if (n >= 10000) return `¥${(n / 10000).toFixed(1)} 万`;
    return `¥${n.toLocaleString('zh-CN')}`;
  }

  function episodeText(ep, total) {
    const a = ep > 0 ? String(ep) : '--';
    const b = total > 0 ? String(total) : '--';
    return `${a} / ${b}`;
  }

  function splitCategories(cat) {
    return String(cat || '--').split(/[,，、/|]/).map(s => s.trim()).filter(Boolean);
  }

  function filterItems(list, query, filters, mode) {
    const q = String(query.bookName || '').trim().toLowerCase();
    return list.filter(item => {
      if (filters.copyrightOwner && item.providerId !== filters.copyrightOwner) return false;
      if (filters.preference && filters.preference !== '全部偏好' && item.preference !== filters.preference) return false;
      if (filters.longShort && filters.longShort !== '全部篇幅' && item.longShort !== filters.longShort) return false;
      if (filters.category && filters.category !== '全部类型' && item.category !== filters.category) return false;
      if (filters.completionStatus === '完本' && !item.isComplete) return false;
      if (filters.completionStatus === '未完本' && item.isComplete) return false;
      if (!q) return true;
      if (mode === 'script') {
        return item.title.toLowerCase().includes(q) || (item.screenwriter || '').toLowerCase().includes(q);
      }
      return item.title.toLowerCase().includes(q) || (item.author || '').toLowerCase().includes(q);
    });
  }

  window.COPYRIGHT_DATA = {
    providers,
    books,
    scripts,
    ranking,
    filterOptions,
    scriptScoreDims,
    scriptAdaptDims,
    scriptRiskDims,
    scriptDetailTabs,
    formatWordCount,
    formatPlayCount,
    formatShelfDate,
    formatRevenue,
    episodeText,
    splitCategories,
    filterItems,
    filterWwdsScripts,
    getScriptDetail,
    renderMarkdown,
    roundScore,
    scriptRadarPoints,
    scriptRadarGrid,
  };
})();
