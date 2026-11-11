/* =========================================================
   Site data — 作品やプロフィールを編集するときはここだけ触ればOK
   ========================================================= */

window.SITE = {
  name: { en: 'Nagao Takahiro', ja: '長尾 崇寛', kana: 'ながお たかひろ' },
  role: 'CG Artist',
  location: 'Fukuoka, Japan',

  /* 連絡先：空欄のものはサイトに表示されない */
  contact: {
    email: '',
    x: '',
    instagram: '',
    artstation: '',
  },

  profile: {
    from: '福岡県 田川市 出身',
    statement:
      'オリジナル作品から模写作品まで、仕事とは別に自主制作した作品たち。題名にストーリーを添えているものは、構想段階からすべてゼロベースで制作したオリジナル作品。',
    likes: [
      { k: '映画', v: 'MCU全部 / ワイルド・スピード / キングスマン / となりのトトロ' },
      { k: 'ゲーム', v: 'スマブラ / ストリートファイター6 / PUBG / メタルギアソリッドV: TPP / デス・ストランディング' },
      { k: 'アニメ', v: 'NARUTO / 鋼の錬金術師 / 亜人 / デスノート / ゆるキャン△' },
      { k: '趣味', v: 'ラーメンめぐり / キャンプ / テニス / バッティング / バイク（をとりたい）' },
    ],
    tools: {
      main: ['Maya', 'Nuke', 'Substance Painter', 'Photoshop', 'After Effects', 'Unity'],
      sub: ['Houdini', 'Premiere Pro', 'Illustrator', 'Substance Designer', 'Unreal Engine'],
    },
    career: [
      {
        year: '2020',
        items: ['福岡デザイン＆テクノロジー専門学校 CG科（4年制）入学'],
      },
      {
        year: '2023',
        items: [
          'クラスター株式会社 アルバイト就職',
          '東京都 × KDDI株式会社「メタバース体験教室」メイン会場制作',
          '他 7 案件制作',
        ],
      },
      {
        year: '2024',
        items: [
          '福岡デザイン＆テクノロジー専門学校 卒業',
          'クラスター株式会社 新卒正社員就職',
          'ヤンマーホールディングス株式会社 ワールド メイン会場制作',
          '他 18 案件制作',
        ],
      },
      {
        year: '2025',
        items: [
          '株式会社エヌ・デザイン 業務委託契約',
          '映画「隣のステラ」VFX担当',
          'ドラマ「地獄に堕ちるわよ」3D・VFX担当',
          '他 5 案件制作',
        ],
      },
    ],
  },


  /* 業務用デモリール（Googleドライブの「長尾崇寛_デモリール業務版2025年_2026年.mp4」から書き出し） */
  reel: {
    years: '2025 – 2026',
    duration: '1:33',
    poster: 'assets/img/reel-poster.webp',
    teaser: 'assets/video/teaser.mp4',
    /* 上から順に試して、再生できたものを使う */
    sources: ['assets/video/reel-1080.mp4', 'assets/video/reel-720.mp4'],
  },

  /* 業務実績 */
  professional: {
    lead: 'メタバース空間の制作から、映画・ドラマのVFXまで。',

    /* 株式会社エヌ・デザイン（業務委託）での映像VFX。ポートフォリオ2024–2025 p.25–26 より */
    vfx: {
      company: '株式会社エヌ・デザイン（業務委託）',
      credits: [
        { title: '地獄に堕ちるわよ', kind: 'Drama', role: 'モデル・レイアウト・カメラトラッキング・ライティング・レンダリング・コンポジット', period: '2025.09 – 11' },
        { title: 'シナントロープ', kind: 'Drama', role: 'Roto/Key・トラッキング', period: '2025.11 – 12' },
        { title: 'DOPE 麻薬取締部特捜課', kind: 'Drama', role: 'Roto・仮コンポジット', period: '2025.08' },
        { title: 'ウルトラマンオメガ', kind: 'Tokusatsu', role: 'アニメーション・エフェクトコンポジット・Roto/Key・トラッキング', period: '2025.06 – 07' },
        { title: '天久鷹央の推理カルテ', kind: 'Drama', role: 'コンポジット・Roto/Key・トラッキング', period: '2025.06' },
        { title: '隣のステラ', kind: 'Film', role: 'Roto・トラッキング', period: '2025.04 – 05' },
      ],
    },

    /* デモリールのショットと、リール内の担当工程・説明テキスト */
    shots: [
      { img: 'shot-01', role: 'Layout / Anim / Lighting / Rendering / Composite', note: '鉄橋の奥・鉄橋の上は、人や乗り物を含めすべてCG合成' },
      { img: 'shot-02', role: 'Cam Tracking / Layout / Lighting / Rendering / Composite', note: '鉄橋の奥・鉄橋の上はすべてCG合成' },
      { img: 'shot-03', role: 'Cam Tracking / Layout / Lighting / Rendering / Composite', note: '瓦礫から奥は、人を含めすべてCG合成' },
      { img: 'shot-05', role: 'Keying / Composite', note: '防火壁の奥をCG合成' },
      { img: 'shot-06', role: 'Keying / Composite', note: '防火壁から奥の建物をCG合成、遠景を2D合成' },
      { img: 'shot-07', role: 'Composite', note: '赤・青・黄色の怪獣のCGの色味なじませ、エフェクトの照り返しを追加合成' },
      { img: 'shot-08', role: 'Composite', note: '怪獣のCGの色味なじませ、エフェクト合成、煙などの2Dエフェクトを追加合成' },
    ],

    /* クラスター株式会社でのメタバース制作。ポートフォリオ2024–2025 p.16–18 より */
    cluster: {
      company: 'クラスター株式会社',
      lead: 'メタバースプラットフォーム「cluster」の開発・運営を行っているクラスター株式会社で制作した作品・案件。モバイルで動くリアルタイム空間の制作を手がけた。',
      feature: {
        title: 'YANMAR',
        sub: 'ヤンマーホールディングス株式会社 ワールド — メイン会場',
        tools: ['Unity', 'Maya', 'Houdini', 'Substance Painter', 'Photoshop', 'Illustrator'],
        text: [
          'ヤンマーホールディングス株式会社の提案するワールドを制作。7つの会場を行き来するための中枢となるメイン会場を担当した。制作にあたって会場の形状や大枠のデザインは先方のアイデアを再現し、シェーダー表現やポストプロセスで装飾してデザインを再提案するなどして、双方のイメージをすり合わせるワークフローを経験した。',
          '制作したメイン会場は2つあり、天候がそれぞれ異なる。通常の天候に比べ、不吉な天候のものは大気汚染などが広がった世界で、他会場をめぐり環境を元に戻すというようなコンセプト。メイン会場のエントランスからは海中が見えるため、カスタムシェーダーでコースティクスなどの海中表現に注力した。',
        ],
        images: [
          { img: 'yanmar-01', cap: 'メイン会場：通常天候時' },
          { img: 'yanmar-02', cap: 'メイン会場：不吉天候時' },
          { img: 'yanmar-03', cap: '通常天候時' },
          { img: 'yanmar-04', cap: '不吉天候時' },
          { img: 'yanmar-05', cap: '海中表現：通常天候時' },
          { img: 'yanmar-06', cap: '海中表現：不吉天候時' },
          { img: 'yanmar-07', cap: 'カスタムシェーダー' },
        ],
      },
      works: [
        { client: 'ヤンマーホールディングス株式会社', role: 'メイン会場制作' },
        { client: 'KDDI株式会社', role: 'アニメーション・エフェクト・モデリング' },
        { client: '積水ハウス株式会社', role: 'モデリング・ライティング' },
        { client: '株式会社ニチレイ', role: 'モデリング' },
        { client: '東映アニメーション株式会社', role: 'モデリング' },
        { client: 'テレ朝「メタメタ大作戦」', role: 'モデリング' },
        { client: '近鉄不動産株式会社「てんしばサーキット」', role: 'モデリング' },
        { client: 'チームビルディングゲーム制作（社内）', role: '4会場全体' },
      ],
      /* 各案件の成果物から一部抜粋（cluster-01 〜 cluster-28） */
      gallery: Array.from({ length: 28 }, (_, i) => 'cluster-' + String(i + 1).padStart(2, '0')),
    },
  },

  /* 作品：並び順がそのままサイトの順番になる */
  works: [
    {
      slug: 'saidan',
      title: '災談',
      titleEn: 'Saidan',
      category: 'Original',
      period: '2ヶ月',
      note: 'CyberAgent主催 3DCGコンテスト「3D cross」応募作品',
      cover: 'saidan-01',
      lead:
        '竜人と人間が争い、竜人が敗れた世界。仲間は消え、一人になってしまった竜人は放浪の末、人間の地下帝国にたどり着く。人間の魔法で石化されたその竜人は災いの象徴として語り継がれ、祭壇の広場に祀られた。',
      sections: [
        {
          h: '構図案',
          p: '竜人をメインとして魅せるか、背景をメインとして魅せるか。試行錯誤の末、竜人を生きたままではなく石像にして背景に溶け込ませるというアイデアに至った。ストーリーを何度も構成し直し、主人公である竜人が薄れず、かつ背景が画面の空気感を支配するように構図・演出を設定している。',
        },
      ],
      gallery: ['saidan-02', 'saidan-03', 'saidan-04', 'saidan-05', 'saidan-06'],
    },
    {
      slug: 'chase',
      title: 'Chase!!',
      titleEn: 'Chase!!',
      category: 'Original',
      period: '2週間',
      texture: '1024 × 1024',
      cover: 'chase-01',
      lead:
        '人間から隠れて生活する小人の世界がコンセプト。ある日人間に見つかってしまい、ガラクタで作った車で逃げ回る姿を描いている。メインとなる車はドロップの空き缶、コルクの切れ端、ホチキスの針などでできており、身の回りにあふれているもので構成されている。',
      sections: [
        {
          h: 'Structure',
          p: '車の構造設定は車体からタイヤ・マフラー・ライトまで何で構成されているか設定している。車体はドロップ缶、タイヤはコルク、マフラーはストローとボールペンの先、ライトは豆電球など。また、画面左手の車はアンティーク、画面右手は近代的というイメージでデザインしている。',
        },
      ],
      gallery: ['chase-02', 'chase-03', 'chase-04'],
    },
    {
      slug: 'batmobile',
      title: 'Batmobile',
      titleEn: 'Batmobile : Arkham Knight',
      category: 'Fan Art / Study',
      period: '3週間',
      cover: 'batmobile-01',
      lead: '',
      sections: [
        {
          h: 'Work Flow',
          p: '特に車両など工業製品を制作する際、モデルの歪みやシワなどがハードサーフェス感を損なわないようにするため、ラフの段階で光沢のあるシェーダーの割り当てを行っている。また、仮のライティングも先に行うことでハイライトの入り方などから形状を調整している。',
        },
      ],
      gallery: ['batmobile-02', 'batmobile-03', 'batmobile-04', 'batmobile-05'],
    },
    {
      slug: 'time-travel',
      title: 'Time travel',
      titleEn: 'Time travel',
      category: 'Original',
      period: '3ヶ月',
      texture: '1024 × 1024',
      cover: 'timetravel-01',
      portrait: true,
      lead:
        '死後、人生を振り返ることができる空間をデザインした。手前から老後・壮年期・幼少期を思わせるアセット群を制作、配置することで、時間の経過を表現している。アセットはほぼ全てを自作し、フリーアセットは全てテクスチャを描きなおすことで雰囲気を統一した。',
      sections: [
        {
          h: 'UV & Texture',
          p: 'メインとなる中央の置時計。長い間時間を司ってきたという設定を描写するため、コケや傷、埃の表現に最も時間をかけた。時計の壁画にはエジプト神話において時間を司っているトート神を描き、エジプト神話が持つ神秘的で不思議な印象の物語を再現している。',
        },
      ],
      gallery: [],
    },
    {
      slug: 'grammophon',
      title: 'Grammophon',
      titleEn: 'Grammophon',
      category: 'Study',
      period: '3ヶ月',
      texture: '1024 × 1024',
      cover: 'grammophon-01',
      portrait: true,
      lead: '',
      sections: [
        {
          h: 'Reference',
          p: 'まずリファレンス画像の観察から着手し、ラフモデルで全体の大まかなシルエットを調節。次に、リファレンスに似た蓄音機の画像・構造を調べ、現実の蓄音機と矛盾のないようにそれぞれパーツのモデリングをし、最後に装飾などのディティールをモデリングした。',
        },
      ],
      gallery: ['grammophon-02'],
    },
    {
      slug: 'mjolnir',
      title: 'Mjölnir',
      titleEn: 'Mjölnir',
      category: 'Fan Art / Study',
      period: '7時間',
      cover: 'mjolnir-01',
      lead: '',
      sections: [],
      gallery: ['mjolnir-02', 'mjolnir-05', 'mjolnir-03', 'mjolnir-04', 'mjolnir-06'],
    },
    {
      slug: 'steam-legends',
      title: 'Steam Legends',
      titleEn: 'Steam Legends',
      category: 'Personal Work',
      period: '2ヶ月',
      cover: 'steam-01',
      lead: '',
      sections: [],
      gallery: ['steam-02', 'steam-03', 'steam-04', 'steam-05', 'steam-06', 'steam-07'],
    },
  ],
};
