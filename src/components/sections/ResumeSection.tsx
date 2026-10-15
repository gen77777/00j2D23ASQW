import type { ContentData } from "@/types/content";

export default function ResumeSection({ data }: { data: ContentData["resume"] }) {
  return (
    <section
      id="resume"
      aria-labelledby="resume-title"
      className="scroll-mt-24 w-full bg-[#000000] text-white px-6 md:px-12 lg:px-20 py-28 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto space-y-32">
        {/* =========================================================
            HEADER: Bold Modern Graphic Punch (No stiff typesetting)
           ========================================================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-white/50 uppercase">
            <span className="w-2 h-2 bg-white inline-block" />
            <span>02 / DOSSIER & RESUME</span>
            <span className="text-white/20">/</span>
            <span>経歴・スキル</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/15">
            <h2 id="resume-title" className="text-5xl md:text-8xl font-display font-medium tracking-tight leading-[0.9]">
              PROFILE &<br />EXPERIENCE.
            </h2>
            <div className="max-w-md lg:text-right space-y-2">
              <p className="text-lg md:text-xl font-medium text-white/90">
                パッケージの実務から、Web・アプリの設計へ。
              </p>
              <p className="text-xs md:text-sm text-white/50 leading-relaxed font-sans">
                3年間のグラフィック・パッケージ実務経験（年間100件以上）と、現在専門学校で学ぶJava・Web開発技術を融合したクリエイティブ。
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            BLOCK 01: WORK EXPERIENCE (Visual Dossier Cards)
           ========================================================= */}
        <div className="space-y-10">
          <div className="flex justify-between items-baseline">
            <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-white/60">
              01 — 職務経歴 (WORK HISTORY)
            </h3>
            <span className="text-xs font-mono text-white/40">2020 — 2026 ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Primary Feature: 川茶グループ (3 Years Lead) */}
            <div className="lg:col-span-8 p-8 md:p-12 border border-white/15 bg-white/[0.02] flex flex-col justify-between space-y-10">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 border border-white/20 px-3 py-1 text-xs font-mono text-white/80">
                    <span className="w-1.5 h-1.5 bg-white inline-block animate-pulse" />
                    <span>正社員・デザイン部リード</span>
                  </div>
                  <span className="font-mono text-sm tracking-wider text-white/50">
                    2020.09 — 2023.05 (約3年間)
                  </span>
                </div>

                <h4 className="text-3xl md:text-5xl font-medium tracking-tight mb-2">
                  川茶グループ（川茶集団）
                </h4>
                <p className="text-sm font-mono text-white/60 mb-6">
                  中国 / デザイン部 / グラフィックデザイナー
                </p>
                <p className="text-xs font-mono text-white/40 pb-6 border-b border-white/10">
                  ［事業内容］茶葉の栽培・加工・販売、ブランド運営（設立2000年 / 資本金約76億円 / 従業員約200名）
                </p>

                {/* Stat Highlights Bar */}
                <div className="grid grid-cols-3 gap-4 py-8 border-b border-white/10 font-mono">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold tracking-tight text-white">100+</div>
                    <div className="text-[10px] text-white/50 tracking-wider uppercase mt-1">年間パッケージ開発数</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold tracking-tight text-white">3 YRS</div>
                    <div className="text-[10px] text-white/50 tracking-wider uppercase mt-1">自社ブランド実務</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold tracking-tight text-white">DTP</div>
                    <div className="text-[10px] text-white/50 tracking-wider uppercase mt-1">入稿・現場色校正</div>
                  </div>
                </div>

                {/* Key Deliverables Grid */}
                <div className="mt-8 space-y-4">
                  <span className="text-xs font-mono tracking-widest text-white/40 uppercase block">
                    担当業務・制作領域
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-white/80">
                    <div className="p-4 border border-white/10 bg-white/[0.01]">
                      <span className="font-mono text-white block mb-1 font-medium">新商品パッケージ開発</span>
                      <p className="text-white/60 leading-relaxed">
                        印刷コストや物理構造の制約を踏まえ、量産性と手に取りやすさを両立するデザインを追求。
                      </p>
                    </div>
                    <div className="p-4 border border-white/10 bg-white/[0.01]">
                      <span className="font-mono text-white block mb-1 font-medium">販促ツールの企画・制作</span>
                      <p className="text-white/60 leading-relaxed">
                        ロゴ、ブランドカタログ、ポスター、店頭POPなど一連のプロモーション資材を一貫制作。
                      </p>
                    </div>
                    <div className="p-4 border border-white/10 bg-white/[0.01]">
                      <span className="font-mono text-white block mb-1 font-medium">印刷入稿データ作成・色校正</span>
                      <p className="text-white/60 leading-relaxed">
                        印刷会社と直接連携し、CMYK入稿、特殊加工指定、現場での色校正まで責任遂行。
                      </p>
                    </div>
                    <div className="p-4 border border-white/10 bg-white/[0.01]">
                      <span className="font-mono text-white block mb-1 font-medium">ブランドイメージ統一</span>
                      <p className="text-white/60 leading-relaxed">
                        複数ブランドのトーン＆マナーを整理し、視覚的な一貫性とブランド価値の向上を推進。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Experience: マクドナルド & 制作姿勢 */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-8">
              <div className="p-8 border border-white/15 bg-white/[0.02]">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="border border-white/20 px-2 py-0.5 text-[10px] font-mono text-white/60">
                    アルバイト
                  </span>
                  <span className="font-mono text-xs text-white/40">2024.07 — 現在</span>
                </div>
                <h4 className="text-xl font-medium tracking-tight mb-1">
                  マクドナルド ポンテポルタ店
                </h4>
                <p className="text-xs font-mono text-white/50 mb-4">日本 / 店舗運営・接客スタッフ</p>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  チーム連携を重視した迅速なオペレーション、日本国内のビジネス環境での対人コミュニケーション能力を実践。
                </p>
              </div>

              {/* Designer Philosophy Quote */}
              <div className="p-8 border border-white/15 bg-white/[0.04] space-y-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block">
                  CORE PHILOSOPHY
                </span>
                <p className="text-lg font-medium text-white leading-snug">
                  「開けやすさ・陳列のしやすさ」から、システムの「操作性・利便性」へ。
                </p>
                <p className="text-xs text-white/60 leading-relaxed font-sans">
                  限られた構造制約の中で最高のアウトプットを導く「実現力の高いデザイン」を、WebやアプリのUI設計に直結させます。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BLOCK 02: SKILLS & TOOLSTACK (Graphic Spec Sheets)
           ========================================================= */}
        <div className="space-y-10">
          <div className="flex justify-between items-baseline">
            <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-white/60">
              02 — 活かせるスキルスタック (CAPABILITIES)
            </h3>
            <span className="text-xs font-mono text-white/40">3 YEARS + ACADEMIC</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            {/* Design Spec */}
            <div className="border border-white/15 p-8 bg-white/[0.02] flex flex-col justify-between">
              <div>
                <span className="text-white/40 text-[10px] tracking-widest uppercase block mb-3">
                  01 / GRAPHIC & PACKAGE
                </span>
                <h4 className="text-2xl font-medium text-white mb-6 font-display">DESIGN.</h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-white block font-medium">Adobe Illustrator</span>
                    <span className="text-white/50 text-[11px]">実務3年以上 / パッケージ・ロゴ・DTP</span>
                  </div>
                  <div>
                    <span className="text-white block font-medium">Adobe Photoshop</span>
                    <span className="text-white/50 text-[11px]">画像加工・フォトレタッチ・合成</span>
                  </div>
                  <div>
                    <span className="text-white block font-medium">Blender</span>
                    <span className="text-white/50 text-[11px]">3Dパッケージモックアップ作成</span>
                  </div>
                  <div>
                    <span className="text-white block font-medium">DTP & 色校正</span>
                    <span className="text-white/50 text-[11px]">製版指示・入稿データ作成・印刷現場対応</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dev Spec */}
            <div className="border border-white/15 p-8 bg-white/[0.02] flex flex-col justify-between">
              <div>
                <span className="text-white/40 text-[10px] tracking-widest uppercase block mb-3">
                  02 / WEB & SYSTEM
                </span>
                <h4 className="text-2xl font-medium text-white mb-6 font-display">DEV.</h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-white block font-medium">HTML5 / CSS3 / JavaScript</span>
                    <span className="text-white/50 text-[11px]">レスポンシブWeb制作 / UI実装</span>
                  </div>
                  <div>
                    <span className="text-white block font-medium">Java / Spring Boot</span>
                    <span className="text-white/50 text-[11px]">オブジェクト指向・保守性を見据えた設計</span>
                  </div>
                  <div>
                    <span className="text-white block font-medium">開発環境 & ツール</span>
                    <span className="text-white/50 text-[11px]">VS Code / Eclipse / IntelliJ / Git</span>
                  </div>
                  <div>
                    <span className="text-white block font-medium">UI / UX 設計</span>
                    <span className="text-white/50 text-[11px]">ユーザー視点の直感的な情報設計</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Business & Language */}
            <div className="border border-white/15 p-8 bg-white/[0.02] flex flex-col justify-between">
              <div>
                <span className="text-white/40 text-[10px] tracking-widest uppercase block mb-3">
                  03 / BUSINESS & LANG
                </span>
                <h4 className="text-2xl font-medium text-white mb-6 font-display">LANG.</h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-white block font-medium">Microsoft Office</span>
                    <span className="text-white/50 text-[11px]">Word / Excel / PowerPoint（資料制作）</span>
                  </div>
                  <div>
                    <span className="text-white block font-medium">日本語能力</span>
                    <span className="text-white/50 text-[11px]">日本語能力試験 JLPT N2 取得（N1学習中）</span>
                  </div>
                  <div>
                    <span className="text-white block font-medium">母国語</span>
                    <span className="text-white/50 text-[11px]">中国語（ネイティブ）</span>
                  </div>
                  <div>
                    <span className="text-white block font-medium">コミュニケーション</span>
                    <span className="text-white/50 text-[11px]">印刷会社やチームとの円滑な連携力</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BLOCK 03: EDUCATION & CERTIFICATIONS (Dual Grid)
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          {/* Education Track */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-white/60">
              03 — 学歴 (ACADEMIC TRACK)
            </h3>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-5 border border-white/10 bg-white/[0.01]">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-medium text-white">早稲田文理専門学校</h4>
                  <span className="text-white/40 text-[11px]">2025.04 — 2027.03 卒業見込</span>
                </div>
                <p className="text-white/50 text-[11px]">学校法人中央情報学園 / アプリ・Web制作学科</p>
              </div>

              <div className="p-5 border border-white/10 bg-white/[0.01]">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-medium text-white">城東日本語学校</h4>
                  <span className="text-white/40 text-[11px]">2023.10 — 2025.03 卒業</span>
                </div>
                <p className="text-white/50 text-[11px]">日本国内における日本語教育課程修了</p>
              </div>

              <div className="p-5 border border-white/10 bg-white/[0.01]">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-medium text-white">楽山師範学院</h4>
                  <span className="text-white/40 text-[11px]">2014.09 — 2019.06 卒業</span>
                </div>
                <p className="text-white/50 text-[11px]">ビジュアルコミュニケーションデザイン専攻</p>
              </div>

              <div className="p-5 border border-white/10 bg-white/[0.01]">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-medium text-white">中国四川省宜賓市第三高等学校</h4>
                  <span className="text-white/40 text-[11px]">2011.09 — 2014.06 卒業</span>
                </div>
                <p className="text-white/50 text-[11px]">普通科</p>
              </div>
            </div>
          </div>

          {/* Certifications Badges */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-white/60">
              04 — 保有資格・検定 (CREDENTIALS)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-5 border border-white/15 bg-white/[0.02] flex flex-col justify-between min-h-[90px]">
                <span className="text-white font-medium text-sm">ITパスポート 合格</span>
                <span className="text-white/40 text-[11px] mt-2">2026.06 取得</span>
              </div>
              <div className="p-5 border border-white/15 bg-white/[0.02] flex flex-col justify-between min-h-[90px]">
                <span className="text-white font-medium text-sm">情報検定 情報活用試験 3級</span>
                <span className="text-white/40 text-[11px] mt-2">2025.12 取得</span>
              </div>
              <div className="p-5 border border-white/15 bg-white/[0.02] flex flex-col justify-between min-h-[90px]">
                <span className="text-white font-medium text-sm">情報処理技能検定（表計算）3級</span>
                <span className="text-white/40 text-[11px] mt-2">2025.12 取得</span>
              </div>
              <div className="p-5 border border-white/15 bg-white/[0.02] flex flex-col justify-between min-h-[90px]">
                <span className="text-white font-medium text-sm">日本語能力試験（JLPT）N2 合格</span>
                <span className="text-white/40 text-[11px] mt-2">2024.10 取得</span>
              </div>
              <div className="p-5 border border-white/15 bg-white/[0.02] sm:col-span-2 flex items-baseline justify-between p-5 min-h-[70px]">
                <span className="text-white font-medium text-sm">レタリング技能検定 3級 合格</span>
                <span className="text-white/40 text-[11px]">2024.06 取得</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
