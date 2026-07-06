(function () {
  const BASE = 'http://test.aixtdz.com/preview/';
  const ASSET = BASE + 'assets/canvas-example-assets/';
  const IP_SHOWCASE = BASE + 'assets/generated/visual-ip-showcase/';
  const TOOL_COVERS = 'assets/tool-covers/';

  const VIDEO_STRUCTURE_CHAPTERS = [
    ['外包名单', '主角在早班会上被优化，只拿到一张结算单和未缴满的社保记录；他选择先隐瞒家人。', '名单不是结束，是所有账单开始同日追来的第一声。'],
    ['押金窗口', '医院窗口要求先缴检查和药费，妻子只缴了一部分，主角赶到时又收到房租催缴。', '他第一次发现现金流比病情更先把家压弯。'],
    ['高流水样本', '熟人展示一天高流水截图，引导主角签下租车分期合同，合同暗藏提前退车扣款。', '他只看见明天能赚钱，没看见今天已欠账。'],
    ['第一天上线', '主角跑单到深夜，流水看似可观，扣掉车租、电费、平台服务费后所剩无几。', '妻子在洗衣机里发现租车合同。'],
    ['免息手机', '为了接单不卡顿，主角分期换手机；女儿想买学习设备被拒，父女第一次为钱吵起来。', '免息变成家庭内部最刺耳的双标。'],
    ['四星投诉', '一次绕路投诉让平台扣服务分，主角连续接远单补流水，错过和家人吃饭。', '平台分数开始替他安排生活。'],
    ['药瓶', '妻子把药装进维生素瓶，害怕同事知道病情；主角不理解她的隐瞒。', '她反问：你敢把裁员告诉你妈吗？'],
    ['货运临活', '主角接一趟高价短途货运，要先垫油费和押金，到仓库后却被无偿等待。', '看似多一条路，其实多一笔垫资。'],
    ['服务区没有车位', '凌晨困到眼皮发沉，服务区满位，主角被迫继续开；妻子电话无人接。', '疲惫开始变成安全风险。'],
    ['压运费', '货到后被挑出包装压痕扣钱，老板以没下次活威胁，主角一夜只赚零头。', '他发现劳动也可以被结算规则吃掉。'],
    ['同日扣款', '月底手机、车租、信用卡、培训尾款同时弹出，主角第一次理解免息也会变成同日扣款。', '熟人发来贷款中介工位邀请。'],
    ['贷款工位', '主角进入咨询服务中心，学习把利息说成月供、把服务费说成方案费。', '他开始用话术处理和自己一样的人。'],
    ['第一个客户', '第一个客户也是被车租和投诉压住的司机，主角照表填资料时看见自己的影子。', '同情不能还房租。'],
    ['体检表', '妻子的体检表被拍进工作群，引发隐私猜测；主角想理论却被客户签约电话拉走。', '家庭尊严和赚钱机会撞在同一刻。'],
    ['服务费', '客户到账少了一大笔服务费，当场质问；主角想起妻子在医院只缴一半钱。', '签收单上的每个字都像在写自己。'],
    ['女儿的剪辑单', '女儿偷偷接低价剪辑单补家用，被无限修改；她把家里扣款截图摔到桌上。', '孩子比父母更早看见真账本。'],
    ['熟人名单', '系统导入通讯录筛选高负债客户，主角看见妻子同事、班主任和前工友。', '熟人社会最后一层体面被算法拆开。'],
    ['药费断档', '妻子因少拿工资导致药费断档，主角送医途中不断接到客户投诉电话。', '他承认自己正在把别人推进同一个坑。'],
    ['退车与违约金', '主角想退车止损，却被合同要求支付违约金和整备费；出口早被写成收费项目。', '每个逃离口都提前标好了价格。'],
    ['公开账本', '主角把所有扣款、分期、药费和车租列成表，向家人坦白裁员和贷款中介事实。', '三个人不再互相安慰，只开始删掉非必要分期。'],
    ['断开接力', '一家人停止债务接力，联系医院社工、劳动仲裁和平台申诉，保留低收入现实但不再隐瞒。', '没有暴富，只有终于不再把坑传给下一个人。'],
  ].map((item, index) => ({
    number: index + 1,
    title: item[0],
    stage: index < 4 ? '引爆' : index < 10 ? '加压' : index < 16 ? '反噬' : index < 20 ? '摊牌' : '止损',
    beat: item[1],
    endingHook: item[2],
  }));

  function visuals(id) {
    const map = {
      'prompt-extract': [
        ['生成结果图', '合同与账单主画面', ASSET + 'shot-contract.png'],
        ['镜头示例', '医院走廊推进', ASSET + 'shot-corridor.png'],
        ['风格样张', '雨夜城市低饱和', ASSET + 'video-city-hero.png'],
      ],
      'video-structure': [
        ['开场钩子图', '压力现场先入镜', ASSET + 'shot-contract.png'],
        ['中段加压图', '人物进入规则空间', ASSET + 'shot-corridor.png'],
        ['结尾余味图', '城市雨夜收束', ASSET + 'video-city-hero.png'],
      ],
      'audio-extract': [
        ['声画结果图', '城市雨声底噪', ASSET + 'video-city-hero.png'],
        ['情绪节点', '夜间办公室停顿', ASSET + 'scene-office-night.png'],
        ['音效场景', '走廊回声与脚步', ASSET + 'shot-corridor.png'],
      ],
      'asset-extract': [
        ['人物资产图', '主角状态', ASSET + 'character-hero.png'],
        ['场景资产图', '办公室夜景', ASSET + 'scene-office-night.png'],
        ['道具资产图', '证据墙与文件', ASSET + 'shot-evidence.png'],
      ],
      'visual-ip-agent': [
        ['IP母版', '原创角色识别', ASSET + 'character-hero.png'],
        ['封面构图', '横竖版安全区', ASSET + 'character-fullbody.png'],
        ['视觉DNA', '光影与材质', ASSET + 'shot-evidence.png'],
      ],
    };
    const set = map[id] || map['prompt-extract'];
    return set.map(([kicker, title, src]) => ({ kicker, title, src }));
  }

  function blocks(id, source) {
    if (id === 'visual-ip-agent') {
      return [
        {
          title: '账号图片风格拆解',
          tag: '视觉DNA',
          desc: '只分析图片视觉风格，不分析选题和运营。',
          copy: `账号来源：${source}\n\n整体视觉：半写实数字IP / 短视频封面海报感 / 电影级侧光，第一眼情绪为克制、神秘、强识别。\n人物系统：固定年龄感、脸型轮廓、眼神强度、发型外轮廓和服装材质，不照搬参考账号的人脸、服装、商标、文字。\n构图系统：半身或近景为主，三分之二侧脸和正面凝视交替，人物占画面 45%-65%，保留标题安全区。\n色彩光影：固定主色 LUT，冷暖对撞或低饱和黑金/蓝灰方向，侧逆光、轮廓光、浅景深、轻微颗粒。\n封面统一：靠同一 IP 脸部识别、主色、光位、镜头比例和背景质感形成系列感。`,
        },
        {
          title: '总体风格提示词',
          tag: 'GPT-m2',
          desc: '可直接作为通用风格底座。',
          copy: '中文提示词：原创数字IP视觉风格，半写实电影感短视频封面，人物半身近景，三分之二侧脸或正面凝视，固定主色调，侧逆光和轮廓光，真实材质纹理，背景有场景层次但不抢主体，浅景深，轻微胶片颗粒，高清细节，适合 3:4 / 9:16 / 16:9。\n\nEnglish prompt: original digital IP visual style, semi-realistic cinematic short-video cover, half-body close shot, three-quarter face or direct gaze, consistent color palette, side backlight and rim light, realistic material texture, layered background, shallow depth of field, subtle film grain, high detail, cover-ready composition.\n\n负面提示词：原账号人脸、同款服装、商标、水印、文字、具体构图、低清晰度、脸崩、手指错误、过度磨皮、主体过小、元素堆砌。',
        },
        {
          title: '原创数字IP人设',
          tag: '人物母版',
          desc: '保留视觉气质，但人物必须原创。',
          copy: '中文提示词：原创数字IP人物，28-35岁，清晰脸部识别，冷静但有故事感的眼神，轮廓明确的发型，服装为原创剪裁和原创材质体系，配一个小型识别配饰，姿态稳定，适合长期账号封面；固定脸部比例、眼神、发型轮廓、服装主色和标志物。\n\n英文提示词：original digital IP character, 28-35 years old, consistent facial identity, calm eyes with story tension, recognizable hairstyle silhouette, original outfit system and material texture, one small signature accessory, stable pose, reusable for long-term account covers.\n\n固定人设关键词：脸部比例、眼神、发型轮廓、服装体系、主色、标志物、常用光位。\n可变元素：场景、动作、手势、局部道具、情绪强度、横竖版比例。',
        },
        {
          title: '5条封面图提示词',
          tag: '封面直出',
          desc: '每条都带主体、场景、构图、光影和负面词。',
          copy: '1. 原创数字IP半身近景，三分之二侧脸，城市夜景虚化背景，人物占画面55%，侧逆光勾边，冷蓝主色，电影海报质感，9:16，负面：文字、水印、商标、复刻参考账号脸。\n2. 原创数字IP正面凝视，室内低光场景，人物居中但保留上方标题安全区，硬侧光，黑金低饱和，3:4，负面：脸崩、手指错误、过度磨皮。\n3. 原创数字IP全身站姿，背景为抽象光效和真实材质墙面，人物占45%，轮廓光明显，16:9，负面：主体过小、元素堆砌、同款服装。\n4. 原创数字IP回头动作，前景轻微虚化，背景有场景层次，冷暖对撞光，浅景深，高清细节，9:16，负面：文字、商标、低清晰度。\n5. 原创数字IP稳定半身构图，换新场景但沿用同一主色和光位，表情克制，商业封面质感，3:4，负面：复制具体构图、专属道具、过度滤镜。',
        },
        {
          title: '统一模板与差异化',
          tag: '系列规则',
          desc: '让 10 张图看起来属于同一个 IP。',
          copy: '统一模板：主体人物=同一原创IP；服装风格=原创剪裁和固定材质；表情状态=克制、坚定、有故事感；动作姿态=半身凝视/侧脸回头/稳定站姿；背景元素=可换场景但保留同一质感层级；主色调=固定LUT；光影方式=侧逆光+轮廓光；镜头语言=半身近景为主；后期风格=高清、轻颗粒、浅景深。\n\n可借鉴：气质、色彩方向、光影方式、镜头节奏、材质质感。\n不能照搬：人脸、服装、商标、文字、具体构图、专属道具。\n原创改法：换角色身份、年龄气质、符号系统、背景世界观和动作语言。',
        },
      ];
    }
    if (id === 'audio-extract') {
      return [
        {
          title: '人物音色',
          tag: '配音可用',
          desc: '主角、配角和旁白的声音设定，可直接给 TTS 或配音同事。',
          copy: '人物音色A：35-42岁男性，中低音区，气息压低，语速中慢，句尾略收，疲惫但克制；适合主角内心独白与现实压力对白。\n人物音色B：30-38岁女性，清亮但带病后虚弱感，音量偏轻，停顿更长；适合妻子/家属线。\n旁白音色：中性纪录片口吻，不煽情，低动态范围，贴近现实短剧复盘。',
        },
        {
          title: '环境声',
          tag: '声音资产',
          desc: '可进入音效库的环境底噪。',
          copy: '环境声提示词：清晨出租屋楼道，远处电动车经过，楼上轻微脚步声，手机振动贴在木桌上，窗外城市低频噪声，整体音量低，不抢对白，持续5秒，可无缝循环。',
        },
        {
          title: '关键音效',
          tag: '剪辑可用',
          desc: '可直接放进短剧剪辑节点。',
          copy: '关键音效清单：\n1. 手机扣款提示音：短促、干净、带轻微压迫感，0.4秒。\n2. 门锁转动声：金属摩擦轻响，强调人物回家前的停顿。\n3. 纸张摊开声：合同/账单被推到桌面，干脆不夸张。\n4. 深夜电梯到站声：低频叮声，接空镜或转场。',
        },
        {
          title: '情绪节奏',
          tag: '可接声画',
          desc: '给剪辑和声音设计使用的情绪时间轴。',
          copy: '5秒声音节奏：0-1s 环境底噪进入；1-2s 手机振动和扣款提示；2-3.5s 人物吸气停顿；3.5-4.5s 纸张摩擦/账单落桌；4.5-5s 留半秒空白，给下一句对白进入。',
        },
      ];
    }
    if (id === 'prompt-extract') {
      return [
        {
          title: '主画面提示词',
          tag: '生图可用',
          desc: '可直接给画面生成模型使用。',
          copy: '现实题材短剧画面，清晨狭小出租屋内，一名疲惫的中年男人坐在餐桌边，桌上摊开账单、租车合同和手机扣款通知，窗外冷白天光，人物眼神压抑但没有哭，纪录片质感，手持摄影，35mm镜头，浅景深，低饱和，真实皮肤纹理，生活杂物自然堆放。',
        },
        {
          title: '镜头词',
          tag: '分镜可用',
          desc: '可直接贴进分镜或视频生成参数。',
          copy: '镜头语言：低机位近景推入，先拍手机扣款通知，再缓慢移到人物手指捏紧账单，最后停在人物半侧脸；手持轻微晃动，速度慢，压迫感逐步增强，不使用夸张运镜。',
        },
        {
          title: '风格词',
          tag: '风格可用',
          desc: '可放进风格页或统一视觉 DNA。',
          copy: '视觉风格：现实主义、冷白自然光、低饱和城市生活、非精致化布景、轻微噪点、纪录片式构图、人物状态优先于漂亮画面、避免广告感、避免棚拍感。',
        },
        {
          title: '负面词',
          tag: '模型可用',
          desc: '用于减少跑偏和过度包装。',
          copy: '负面词：豪宅、精英办公室、过度磨皮、商业广告质感、夸张哭戏、强烈霓虹、赛博朋克、古装、奇幻、暴富符号、干净到不真实的房间、网红滤镜、过度戏剧化灯光。',
        },
      ];
    }
    return [
      {
        title: '人物资产',
        tag: '人物库可用',
        desc: '可直接进入人物资产审核。',
        copy: '人物资产1：被裁中年男，38岁，前物流主管，短发、旧夹克、眼下疲态明显，核心状态是强撑。\n人物资产2：妻子，34岁，身体不适但维持家庭秩序，家居毛衣，语气克制。\n人物资产3：女儿，13岁，敏感早熟，会用剪辑单补家用，校服外套。',
      },
      {
        title: '场景资产',
        tag: '场景库可用',
        desc: '可直接进入场景资产审核。',
        copy: '场景资产：\n1. 清晨出租屋餐桌：账单、旧杯子、手机、合同。\n2. 医院缴费窗口：冷白灯、排队栏、电子屏。\n3. 货运仓库门口：夜间钠灯、临时装卸区、地面反光。\n4. 平台司机车内：手机支架、充电线、后视镜、疲劳驾驶氛围。',
      },
      {
        title: '道具资产',
        tag: '道具库可用',
        desc: '可直接分配给美术或生成资产。',
        copy: '道具清单：扣款短信手机界面、租车分期合同、医院缴费单、药瓶、旧保温杯、车钥匙、外卖/货运平台订单页、手写家庭账本。',
      },
      {
        title: '复用素材包',
        tag: '画布可用',
        desc: '可作为画布节点进入后续流程。',
        copy: '复用素材包：现实债务压力短剧基础包。包含：家庭账本视觉符号、合同/扣款道具组、冷白出租屋场景、平台劳动手机界面、疲惫人物状态。适用章节：开场困境、费用叠加、规则反噬、家庭摊牌。',
      },
    ];
  }

  function sourceHost(link) {
    const raw = String(link || '').trim();
    if (!raw) return 'demo://直接生成结果';
    try {
      return new URL(raw).hostname.replace(/^www\./, '');
    } catch {
      return raw.slice(0, 32);
    }
  }

  function buildVideoStructureResult(link) {
    const source = sourceHost(link);
    const chapters = VIDEO_STRUCTURE_CHAPTERS.slice(0, 21);
    const outline = {
      title: '同结构短剧：《同日扣款》',
      category: '视频结构Agent',
      genre: '现实题材短剧',
      logline: `基于 ${source} 的爆款文案结构，转成一套债务压力、平台劳动和家庭现金流的 21 章短剧细纲。`,
      tone: '现实、克制、强钩子、逐章加压，不暴富、不强行反转。',
      chapters,
    };
    return {
      type: 'video-structure-agent',
      sourceLink: link || 'demo://video-structure/直接生成结果',
      visuals: visuals('video-structure'),
      summary: '视频结构Agent 已生成原视频结构拆解和 21 章以内短剧细纲。',
      reviewNote: '结果仅当前用户可见；提交审核后，后续接入管理系统再决定是否开放给其他人。',
      flow: [
        ['0-3s', '开场钩子', '先给观众一个账单、通知或现场压力，不解释背景。'],
        ['3-15s', '人物困境', '让人物的现实处境和隐瞒关系马上成立。'],
        ['15-35s', '成本叠加', '每一次周转都引出下一笔费用和规则限制。'],
        ['35-55s', '反噬转折', '主角发现自己正在把别人推进同一个坑。'],
        ['55s+', '余味收尾', '不暴富，不奇迹，只把真实止损动作留给观众。'],
      ],
      analysis: {
        content: '原视频结构按强钩子开场、人物困境、现实压力加码、关键转折、余味收尾拆解；缺失证据后续由本地 Agent 标记【未识别】。',
        hook: '开头必须先给观众一个现实压力或反差，不解释背景，先让人物处境成立。',
        turn: '中段从“还能扛”转为“规则开始反噬”，让观众意识到主角不是懒，而是被结构性费用包围。',
        rhythm: '1-4章立困境，5-10章持续加压，11-16章债务反噬，17-20章摊牌止损，21章收束余味。',
        skeleton: '强情绪开场 -> 人物困境 -> 成本叠加 -> 规则反噬 -> 家庭摊牌 -> 现实止损。',
      },
      outline,
      chapters,
    };
  }

  function buildDirectResult(tool, link) {
    const source = sourceHost(link);
    const list = blocks(tool.id, source);
    return {
      type: 'direct-usable-result',
      source,
      visuals: visuals(tool.id),
      summary: `已从 ${source} 生成 ${list.length} 组可直接使用的结果。`,
      reviewNote: '结果仅当前用户可见；提交审核后，后续接入管理系统再决定是否开放给其他人。',
      blocks: list,
    };
  }

  function outlineCopyText(result) {
    const outline = result.outline || {};
    const chapters = result.chapters || [];
    return [
      outline.title || '同结构短剧细纲',
      outline.logline ? `一句话：${outline.logline}` : '',
      outline.tone ? `基调：${outline.tone}` : '',
      '',
      ...chapters.map(ch => [
        `${String(ch.number || 0).padStart(2, '0')} · ${ch.title || ''}`,
        `剧情点：${ch.beat || ''}`,
        ch.endingHook ? `尾钩：${ch.endingHook}` : '',
      ].filter(Boolean).join('\n')),
    ].filter(item => item !== '').join('\n\n');
  }

  function combinedBlocksText(blocksList) {
    return (blocksList || []).map(block => [
      block.title ? `【${block.title}】` : '',
      block.desc ? `说明：${block.desc}` : '',
      block.copy || '',
    ].filter(Boolean).join('\n')).filter(Boolean).join('\n\n');
  }

  function buildScriptEvalWwdsDemo(model, quality, script) {
    const modelLabel = model ? ({ gemini: 'Gemini', chatgpt: 'ChatGPT', claude: 'Claude', deepseek: 'DeepSeek' }[model] || model) : 'Gemini';
    const qualityLabel = quality ? ({ micro: '微短剧标准', horizontal: '横屏短剧', premium: '精品长剧' }[quality] || quality) : '微短剧标准';
    const excerpt = String(script || '').trim().slice(0, 120);
    return {
      type: 'script-eval',
      meta: { model: modelLabel, quality: qualityLabel, excerpt },
      work: {
        title: '《女主们对反派的我满好感? 》',
        poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=480&q=80',
        grade: 'A',
        score: 82,
        genre: '穿越系统流/反派逆袭/多女主修罗场',
        wordCount: '30-50 万字',
        platforms: '刺猬猫/番茄/短剧平台',
        bestAdaptation: '短剧',
      },
      marketPosition: {
        title: '市场定位·六维评分',
        dimensions: [
          { key: 'W', name: '世界观', score: 85, tags: ['W8玄幻奇幻脑洞', 'W2穿越系统流'] },
          { key: 'I', name: '人设', score: 90, tags: ['腹黑', '满级大佬隐藏实力', '反差感'] },
          { key: 'H', name: '钩子', score: 90, tags: ['H2反转身份', 'H1爽感打脸', 'H4绝境翻盘'] },
          { key: 'G', name: '金手指', score: 90, tags: ['G3系统型'] },
          { key: 'R', name: '关系', score: 95, tags: ['R4复杂情感-修罗场', 'R1甜宠爱情'] },
          { key: 'V', name: '氛围', score: 85, tags: ['V1爽文热血', 'V2轻松甜宠'] },
        ],
      },
      themeScarcity: {
        score: 80,
        level: '稀缺度较高',
        description: '反派流+多女主修罗场在二次元网文市场较火，但在短剧市场属于上升期题材。结合了「负面好感度爆奖励」的微创新机制，与传统的废柴逆袭形成鲜明反差，具备较好的差异化亮点。',
      },
      adaptation: {
        bestForm: '短剧',
        overallScore: 89,
        items: [
          { name: '短剧', pct: 95 },
          { name: '漫画', pct: 95 },
          { name: '有声', pct: 90 },
          { name: '游戏', pct: 95 },
          { name: '影视', pct: 75 },
        ],
        suggestion: '最适合改编为短剧、漫画或二次元游戏。保留核心的反套路打脸和多女主修罗场设定；难点在于玄幻大场面（如九帝拉棺）特效成本极高，建议短剧化时将背景降维为现代都市异能或古武家族，以控制成本。',
      },
      redlineScan: {
        severe: ['法律逻辑错误（放火无后果）', '违法行为合理化'],
        risk: ['性别对立偏激', '爽文化过度'],
        safe: ['女性成长正向'],
        conclusion: '不可直接过审',
      },
      audienceRisk: {
        audience: [
          { label: '核心受众', value: '18-35 岁男性 · 二次元/系统流爱好者' },
          { label: '次要受众', value: '多女主修罗场、反派逆袭题材用户' },
          { label: '平台匹配', value: '刺猬猫、番茄、短剧平台高匹配' },
        ],
        risks: [
          { level: 'yellow', title: '多女主情感线复杂', desc: '短剧改编需精简女主数量，避免情感线分散导致完播下降。' },
          { level: 'yellow', title: '玄幻特效成本', desc: '九帝拉棺等大场面不适合低成本短剧，需降维处理。' },
          { level: 'green', title: '反套路爽点', desc: '负面好感度机制具备传播记忆点，利于切片与解说。' },
        ],
        summary: '整体受众盘清晰，短剧化需控制成本与情感线复杂度，保留核心爽点即可。',
      },
      fullReport: {
        sections: [
          { title: '作品概况', content: '本作属于穿越系统流反派逆袭题材，主角以「满级大佬扮猪吃虎+多女主修罗场」为核心卖点，综合评级 A（82 分）。' },
          { title: '市场判断', content: '六维评分中关系（95）、人设（90）、钩子（90）表现突出，世界观与氛围稳定在 85 分档，具备短剧改编的结构性优势。' },
          { title: '改编建议', content: '优先短剧/漫画/游戏方向；保留反套路打脸与修罗场，玄幻大场面建议降维为都市异能或古武家族背景。' },
          { title: '风险提示', content: '关注多女主线精简、特效成本控制与平台审核对「反派合理化」叙事的尺度要求。' },
        ],
      },
      reviewNote: '评估结果仅当前用户可见；提交审核后接入管理系统',
    };
  }

  function buildScriptEvalResult(model, quality, script) {
    return buildScriptEvalWwdsDemo(model, quality, script);
  }

  function buildScriptEvalDemo() {
    return buildScriptEvalWwdsDemo('gemini', 'micro', '');
  }

  function scriptEvalReportText(result) {
    if (!result || result.type !== 'script-eval') return '';
    const r = result;
    const w = r.work || {};
    const mp = r.marketPosition || {};
    const lines = [
      '═══════════════════════════════════════════════════',
      '   剧本评估报告 · ' + (w.title || ''),
      '═══════════════════════════════════════════════════',
      '',
      '综合评级：' + (w.grade || '-') + ' · ' + (w.score || '-') + ' 分',
      '题材：' + (w.genre || '-'),
      '字数：' + (w.wordCount || '-'),
      '推荐平台：' + (w.platforms || '-'),
      '最佳改编：' + (w.bestAdaptation || '-'),
      '',
      '【' + (mp.title || '市场定位·六维评分') + '】',
      ...((mp.dimensions || []).map(d => d.key + ' ' + d.name + '：' + d.score + ' · ' + (d.tags || []).join(' / '))),
      '',
      '【题材稀缺度 · ' + ((r.themeScarcity && r.themeScarcity.level) || '-') + ' ' + ((r.themeScarcity && r.themeScarcity.score) || '') + '】',
      (r.themeScarcity && r.themeScarcity.description) || '',
      '',
      '【改编潜力 · 综合分 ' + ((r.adaptation && r.adaptation.overallScore) || '-') + '】',
      '最适合改编形式：' + ((r.adaptation && r.adaptation.bestForm) || '-'),
      ...((r.adaptation && r.adaptation.items) || []).map(item => item.name + '：' + item.pct + '%'),
      '',
      '改编建议：' + ((r.adaptation && r.adaptation.suggestion) || ''),
      '',
      '🚨 审核红线扫描',
      '🔴 严重问题',
      ...((r.redlineScan && r.redlineScan.severe) || []).map(item => '- ' + item),
      '',
      '🟡 风险问题',
      ...((r.redlineScan && r.redlineScan.risk) || []).map(item => '- ' + item),
      '',
      '🟢 安全项',
      ...((r.redlineScan && r.redlineScan.safe) || []).map(item => '- ' + item),
      '',
      '👉 结论：' + ((r.redlineScan && r.redlineScan.conclusion) || '-'),
      '',
      '【受众与风险】',
      ...((r.audienceRisk && r.audienceRisk.audience) || []).map(a => a.label + '：' + a.value),
      ...((r.audienceRisk && r.audienceRisk.risks) || []).map(item => '- ' + item.title + '：' + item.desc),
      (r.audienceRisk && r.audienceRisk.summary) || '',
      '',
      '【完整报告】',
      ...((r.fullReport && r.fullReport.sections) || []).map(s => s.title + '\n' + s.content),
      '═══════════════════════════════════════════════════',
    ];
    return lines.join('\n');
  }

  const SCRIPT_EVAL_PROMPTS = {
    standard: {
      label: '标准',
      text: '你是一位资深短剧责编。请对输入剧本做结构化评分、项目结论、红线扫描、核心问题归纳与改稿策略，评价必须结合剧本具体情节，禁止空泛套话。',
    },
    logic: {
      label: '强逻辑',
      text: '你是逻辑质检主编，优先审查人物动机、物理常识、法律常识、证据链与反派行为合理性。每个 P0 问题必须给出可执行的改写方向。',
    },
    audit: {
      label: '审核增强',
      text: '你是平台审核增强版评估官，优先扫描价值观红线、违法合理化、性别对立、爽文化过度等问题，并给出「能否直接过审」结论。',
    },
    custom: {
      label: '自定义',
      text: '',
    },
  };

  const SCRIPT_BREAKDOWN_DEMO = {
    projectTitle: '《IF》',
    analyzedCount: 5,
    totalEpisodes: 5,
    model: 'Vision 3.5 Flash',
    models: ['Vision 3.5 Flash', 'Gemini 2.5 Pro', 'GPT-4o Vision'],
    episodes: [
      {
        id: 'ep01',
        index: '01',
        fileName: 'If I Never Loved You_D01_1080p.mp4',
        status: 'done',
        statusLabel: '已完成',
        duration: '10:00',
        poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=960&q=80',
        summary: '诺兰曾是华尔街最年轻的合伙人，却在一场精心设计的金融骗局中失去一切。葬礼当天，天空飘起稀薄的雪花，新闻播报着市场崩盘的余波。多年未见的朋友在墓前递上一支白玫瑰，提起他们大学时在图书馆通宵写论文的日子，也提起诺兰如何一步步爬向权力顶峰。\n\n诺兰没有回应，只是盯着墓碑上自己的名字——那是他为自己预备的「如果从未爱过你」的另一种人生。风掀起他的领带，像一面褪色的旗。朋友试图用「你曾拥有一切」来安慰他，诺兰却反问：如果从未爱过，是否就不会失去？\n\n镜头切至闪回：交易大厅的喧嚣、恋人在雨夜分手的侧脸、以及那份被栽赃的 insider 文件。回到现实，诺兰把玫瑰放在墓前，转身离开。雪花渐密，他的背影没入灰白的天际线——第一集以「失去与假设」命题收束，为后续四集的平行人生埋线。',
        scenes: [
          {
            id: 's1',
            number: 1,
            setting: '外 日 墓地',
            settingIntl: 'EXT. DAY CEMETERY',
            characters: '诺兰、朋友',
            props: '白玫瑰',
            lines: [
              { type: 'action', time: '00:00', text: '新闻播报声中，镜头从城市天际线下移至墓园入口。' },
              { type: 'action', time: '00:06', text: '天空飘起稀薄的雪花，墓碑阵列在冷灰天光下延伸。' },
              { type: 'action', time: '00:12', text: '诺兰着深色大衣，独自站在新墓前，领带被风微微掀起。' },
              { type: 'dialogue', time: '00:18', speaker: '朋友', text: '诺兰曾经拥有一切——最年轻的合伙人，最亮眼的未来。' },
              { type: 'dialogue', time: '00:26', speaker: '朋友', text: '可你看现在，连名字都要提前刻在石头上。' },
              { type: 'action', time: '00:34', text: '朋友递上一支白玫瑰，诺兰迟疑片刻后接过。' },
              { type: 'dialogue', time: '00:42', speaker: '诺兰', text: '如果我从没爱过任何人，是不是就不会站在这里？' },
              { type: 'action', time: '00:51', text: '远处新闻车鸣笛，播报声与风声交叠。' },
            ],
          },
          {
            id: 's2',
            number: 2,
            setting: '外 日 墓地',
            settingIntl: 'EXT. DAY CEMETERY',
            characters: '诺兰、朋友',
            props: '白玫瑰、墓碑',
            lines: [
              { type: 'dialogue', time: '01:52', speaker: '朋友', text: '大学那年，你说要买下整面图书馆的窗——为了看一次完整的日落。' },
              { type: 'action', time: '01:58', text: '风吹动诺兰的领带，像一面褪色的旗。' },
              { type: 'dialogue', time: '02:05', speaker: '诺兰', text: '日落还在，窗不在了。' },
              { type: 'action', time: '02:12', text: '闪回：交易大厅，红绿数字狂跳，诺兰在电话那头签下最后一笔。' },
              { type: 'action', time: '02:28', text: '闪回：雨夜，恋人在出租车旁回头，嘴唇微动却未出声。' },
              { type: 'dialogue', time: '02:41', speaker: '朋友', text: '你还有机会。只要愿意承认——' },
              { type: 'dialogue', time: '02:47', speaker: '诺兰', text: '承认什么？爱错了人，还是信错了规则？' },
              { type: 'action', time: '02:55', text: '诺兰将白玫瑰置于墓前，花瓣轻触碑石。' },
              { type: 'action', time: '03:02', text: '他转身离去，雪花渐密，背影渐远。' },
            ],
          },
        ],
      },
      {
        id: 'ep02',
        index: '02',
        fileName: 'If I Never Loved You_D02_1080p.mp4',
        status: 'done',
        statusLabel: '已完成',
        duration: '09:42',
        poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=960&q=80',
        summary: '第二集进入诺兰的华尔街闪回线：他如何在 mentor 的引导下第一次越界，以及恋人在得知真相后的决裂。两条时间线交叉剪辑，墓园现实仅作为片头片尾的锚点。',
        scenes: [
          {
            id: 's1',
            number: 1,
            setting: '内 日 交易大厅',
            settingIntl: 'INT. DAY TRADING FLOOR',
            characters: '诺兰、Mentor',
            props: '双屏显示器、咖啡杯',
            lines: [
              { type: 'action', time: '00:00', text: '开盘铃响，人群如浪潮涌向各自工位。' },
              { type: 'dialogue', time: '00:08', speaker: 'Mentor', text: '规则是给守规矩的人写的。你要赢，就得先知道规则在哪里松。' },
              { type: 'dialogue', time: '00:18', speaker: '诺兰', text: '松到什么程度？' },
              { type: 'dialogue', time: '00:22', speaker: 'Mentor', text: '松到没人能证明你松过。' },
            ],
          },
        ],
      },
      {
        id: 'ep03',
        index: '03',
        fileName: 'If I Never Loved You_D03_1080p.mp4',
        status: 'done',
        statusLabel: '已完成',
        duration: '10:15',
        poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=960&q=80',
        summary: '第三集聚焦雨夜分手与 insider 文件被栽赃的关键一夜，诺兰在恋人与事业之间做出不可逆选择。',
        scenes: [
          {
            id: 's1',
            number: 1,
            setting: '外 夜 雨街',
            settingIntl: 'EXT. NIGHT RAINY STREET',
            characters: '诺兰、艾拉',
            props: '雨伞、文件夹',
            lines: [
              { type: 'action', time: '00:00', text: '雨线斜切霓虹，出租车尾灯拖出红色残影。' },
              { type: 'dialogue', time: '00:14', speaker: '艾拉', text: '这份文件上的签名，是你吗？' },
              { type: 'dialogue', time: '00:20', speaker: '诺兰', text: '不是我。但明天全世界都会说是。' },
            ],
          },
        ],
      },
      {
        id: 'ep04',
        index: '04',
        fileName: 'If I Never Loved You_D04_1080p.mp4',
        status: 'done',
        statusLabel: '已完成',
        duration: '09:58',
        poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=960&q=80',
        summary: '第四集审判与坠落：媒体围堵、保释被拒、Mentor 切割关系。诺兰第一次看见「如果从未爱过」的另一种人生轮廓。',
        scenes: [
          {
            id: 's1',
            number: 1,
            setting: '外 日 法院台阶',
            settingIntl: 'EXT. DAY COURTHOUSE STEPS',
            characters: '诺兰、记者',
            props: '麦克风、闪光灯',
            lines: [
              { type: 'action', time: '00:00', text: '快门声如骤雨，台阶被长枪短炮占满。' },
              { type: 'dialogue', time: '00:09', speaker: '记者', text: '诺兰先生，你后悔吗？' },
              { type: 'dialogue', time: '00:13', speaker: '诺兰', text: '我后悔的是——相信爱能抵消规则。' },
            ],
          },
        ],
      },
      {
        id: 'ep05',
        index: '05',
        fileName: 'If I Never Loved You_D05_1080p.mp4',
        status: 'done',
        statusLabel: '已完成',
        duration: '10:22',
        poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=960&q=80',
        summary: '第五集收束：墓园与现实再次汇合，诺兰在平行假设中做出最后一次选择——不是挽回过去，而是停止把失去转嫁为下一段关系的前提。',
        scenes: [
          {
            id: 's1',
            number: 1,
            setting: '外 日 墓地',
            settingIntl: 'EXT. DAY CEMETERY',
            characters: '诺兰',
            props: '白玫瑰、怀表',
            lines: [
              { type: 'action', time: '00:00', text: '同一座墓，雪已停，天光清亮。' },
              { type: 'dialogue', time: '00:16', speaker: '诺兰', text: '如果从未爱过你——我也不会学会，如何在还爱着的时候松手。' },
              { type: 'action', time: '00:28', text: '他放下怀表，秒针停在雨夜那一刻。' },
            ],
          },
        ],
      },
    ],
  };

  window.WORKBENCH_TOOLS = {
    assetBase: BASE,
    scriptBreakdownDemo: SCRIPT_BREAKDOWN_DEMO,
    tools: [
      {
        id: 'script-eval',
        title: '剧本评估',
        desc: '粘贴剧本文本，选择 AI 模型与评估标准，生成模块化质检评级报告与审核红线清单。',
        users: 5620,
        cover: TOOL_COVERS + 'script-eval.svg',
        submitLabel: '立即评估',
        inputLabel: '剧本内容',
        inputPlaceholder: '粘贴完整剧本或分集正文',
        inputHint: '支持粘贴多集剧本；评估结果含定级、六维分析、评委会诊与必改红线。',
      },
      {
        id: 'script-breakdown',
        title: '剧本拆解',
        desc: '上传分集视频，AI 自动拆解场景、人物、道具与时间轴脚本，支持标准/国际格式切换。',
        users: 7340,
        cover: TOOL_COVERS + 'script-breakdown.svg',
        page: true,
      },
      {
        id: 'prompt-extract',
        title: '提示词提取',
        desc: '输入公开视频链接，提取画面提示词、镜头词、风格词和负面词。',
        users: 12846,
        cover: TOOL_COVERS + 'prompt-extract.svg',
        submitLabel: '生成结果',
        inputLabel: '视频链接',
        inputPlaceholder: '粘贴公开视频链接或分享文案；不填也可直接生成',
        inputHint: '可粘贴整段分享文案；不填会先给结果图和可复制结果样例。',
      },
      {
        id: 'video-structure',
        title: '视频结构提取',
        desc: '输入公开视频链接，提取开场钩子、段落节奏、转折和结尾结构。',
        users: 8932,
        cover: TOOL_COVERS + 'video-structure.svg',
        submitLabel: '生成视频结构',
        inputLabel: '视频链接',
        inputPlaceholder: '粘贴公开视频链接或分享文案；不填也可直接生成',
        inputHint: '可粘贴整段抖音/视频分享文案；不填会先给一份可采纳的视频结构样例。',
      },
      {
        id: 'audio-extract',
        title: '音色音效提取',
        desc: '输入公开视频链接，提取人物音色、环境声、关键音效和情绪节点。',
        users: 6521,
        cover: TOOL_COVERS + 'audio-extract.svg',
        submitLabel: '生成结果',
        inputLabel: '视频链接',
        inputPlaceholder: '粘贴公开视频链接或分享文案；不填也可直接生成',
        inputHint: '可粘贴整段分享文案；不填会先给结果图和可复制结果样例。',
      },
      {
        id: 'asset-extract',
        title: '素材资产提取',
        desc: '输入公开视频链接，提取人物、场景、道具和可复用素材线索。',
        users: 9104,
        cover: TOOL_COVERS + 'asset-extract.svg',
        submitLabel: '生成结果',
        inputLabel: '视频链接',
        inputPlaceholder: '粘贴公开视频链接或分享文案；不填也可直接生成',
        inputHint: '可粘贴整段分享文案；不填会先给结果图和可复制结果样例。',
      },
      {
        id: 'visual-ip-agent',
        title: '账号视觉IP提取',
        desc: '输入抖音账号链接、主页截图和代表图说明，拆解图片视觉风格并生成原创数字IP提示词。',
        users: 4278,
        cover: TOOL_COVERS + 'visual-ip-agent.svg',
        submitLabel: '生成IP结果',
        inputLabel: '账号链接 / 截图说明',
        inputPlaceholder: '粘贴抖音账号链接、主页截图说明或代表图备注',
        inputHint: '可粘贴抖音账号链接、主页截图说明和 5-10 张代表图备注；不填会先给一份 IP Agent 结果预览。',
      },
    ],
    showcase: [
      { title: '黑雨策展人', desc: '冷调城市夜景 · 半写实账号封面 IP', image: IP_SHOWCASE + 'douyin-showcase-ip-01-noir-rooftop.jpg' },
      { title: '档案叙事官', desc: '资料室低光 · 悬疑故事型 IP', image: IP_SHOWCASE + 'douyin-showcase-ip-02-archive-storyteller.jpg' },
      { title: '银发导演型', desc: '玻璃走廊侧光 · 清冷识别度 IP', image: IP_SHOWCASE + 'douyin-showcase-ip-03-silver-director.jpg' },
      { title: '暗巷少年感', desc: '旧街霓虹雨夜 · 都市奇幻 IP', image: IP_SHOWCASE + 'douyin-showcase-ip-04-urban-fantasy.jpg' },
    ],
    audioTimeline: ['0-1s 环境底噪', '1-2s 扣款提示', '2-3.5s 吸气停顿', '3.5-4.5s 纸张落桌', '4.5-5s 留白进对白'],
    buildResult(tool, link) {
      if (tool.id === 'video-structure') return buildVideoStructureResult(link);
      if (tool.id === 'script-eval') return null;
      return buildDirectResult(tool, link);
    },
    buildScriptEvalResult,
    buildScriptEvalDemo,
    scriptEvalReportText,
    defaultScriptEvalPrompts: SCRIPT_EVAL_PROMPTS,
    combinedBlocksText,
    outlineCopyText,
  };
})();
