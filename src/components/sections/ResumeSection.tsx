import type { ContentData } from "@/types/content";

export default function ResumeSection({ data }: { data: ContentData["resume"] }) {
  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="scroll-mt-24 w-full bg-[#000000] text-white px-6 md:px-16 py-24 border-t border-white/15"
    >
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Section Kicker & Big Title */}
        <div className="border-b border-white/15 pb-12">
          <div className="flex justify-between items-baseline text-xs font-mono tracking-widest text-white/50 uppercase mb-6">
            <span>02 / RESUME & EXPERIENCE</span>
            <span>積み重ねてきたこと</span>
          </div>
          <div className="flex items-baseline gap-4 flex-wrap">
            <h2 id="resume-heading" className="text-4xl md:text-7xl font-display font-medium tracking-tight">
              EXPERIENCE.
            </h2>
            <span className="text-xs font-mono tracking-wider border border-white/20 px-2 py-0.5 text-white/70">
              職務経歴・履歴書
            </span>
          </div>
          <p className="mt-6 max-w-2xl text-sm md:text-base text-white/70 leading-relaxed font-sans">
            中国にてグラフィックデザイナーとして約3年間の実務経験。自社ブランドのパッケージや販促物を多数手がけ、現在は早稲田文理専門学校でWeb制作・システム開発を学習中。
          </p>
        </div>

        {/* 1. 職務経歴 (Work Experience) */}
        <div className="space-y-16">
          <div className="text-xs font-mono tracking-widest text-white/40 uppercase">
            01 / CAREER HISTORY
          </div>

          {/* 川茶グループ */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-16 pt-8 border-t border-white/15">
            <div>
              <span className="block text-4xl md:text-5xl font-display font-medium tracking-tight text-white/90">
                2020
              </span>
              <p className="font-mono text-xs text-white/50 mt-2">
                2020.09 — 2023.05
              </p>
              <span className="inline-block mt-3 text-[11px] font-mono tracking-wider text-white/40 border border-white/10 px-2 py-0.5">
                正社員 / 約3年
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight">
                  川茶グループ（川茶集団）
                </h3>
                <p className="text-sm font-mono text-white/60 mt-1">
                  中国 / デザイン部 / グラフィックデザイナー
                </p>
                <p className="text-xs font-mono text-white/40 mt-1">
                  ［事業内容］茶葉の栽培・加工・販売、ブランド運営（設立2000年 / 資本金約76億円 / 従業員約200名）
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                  担当職務・実績
                </p>
                <ul className="divide-y divide-white/10 border-y border-white/10 text-sm text-white/80 font-sans">
                  <li className="py-3.5 leading-relaxed">
                    <strong>新商品パッケージデザイン開発：</strong>年間100件以上の案件に携行。印刷コストや物理的構造の制約を踏まえ、手に取りやすさと量産性を両立するデザインを追求。
                  </li>
                  <li className="py-3.5 leading-relaxed">
                    <strong>販促ツールの企画・制作：</strong>ロゴ、ブランドカタログ、ポスター、店頭POPなどのプロモーション資材を一貫して制作。
                  </li>
                  <li className="py-3.5 leading-relaxed">
                    <strong>印刷入稿データ調整および色校正：</strong>印刷会社と連携し、CMYK入稿データの作成、特殊加工指定、現場色校正まで責任を持って担当。
                  </li>
                  <li className="py-3.5 leading-relaxed">
                    <strong>ブランドイメージの統一と向上：</strong>複数ブランドのトーン＆マナーを整理し、視覚的な一貫性とブランド価値を高めるビジュアルを提案。
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* マクドナルド */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-16 pt-8 border-t border-white/15">
            <div>
              <span className="block text-4xl md:text-5xl font-display font-medium tracking-tight text-white/90">
                2024
              </span>
              <p className="font-mono text-xs text-white/50 mt-2">
                2024.07 — 現在
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight">
                マクドナルド ポンテポルタ店
              </h3>
              <p className="text-sm font-mono text-white/60 mt-1">
                日本 / 店舗運営・接客スタッフ（アルバイト）
              </p>
              <p className="mt-3 text-sm text-white/70 leading-relaxed font-sans">
                チームワークを重視した迅速なオペレーション、日本国内のビジネス環境での対人コミュニケーション能力を実践。
              </p>
            </div>
          </div>
        </div>

        {/* 2. 活かせるスキル (Skills) */}
        <div className="space-y-8 pt-12 border-t border-white/15">
          <div className="text-xs font-mono tracking-widest text-white/40 uppercase">
            02 / SKILLS & EXPERTISE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/10 p-6 bg-white/[0.01]">
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">
                DESIGN
              </span>
              <h4 className="text-lg font-medium text-white mb-3">グラフィック・パッケージ</h4>
              <ul className="text-xs font-mono text-white/70 space-y-2">
                <li className="pb-2 border-b border-white/10">Adobe Illustrator（実務3年以上）</li>
                <li className="pb-2 border-b border-white/10">Adobe Photoshop（画像加工・合成）</li>
                <li className="pb-2 border-b border-white/10">Blender（3Dモックアップ）</li>
                <li>DTP・入稿データ作成・現場色校正</li>
              </ul>
            </div>

            <div className="border border-white/10 p-6 bg-white/[0.01]">
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">
                DEVELOPMENT
              </span>
              <h4 className="text-lg font-medium text-white mb-3">Web・アプリ開発</h4>
              <ul className="text-xs font-mono text-white/70 space-y-2">
                <li className="pb-2 border-b border-white/10">HTML5 / CSS3 / JavaScript</li>
                <li className="pb-2 border-b border-white/10">Java / Spring Boot</li>
                <li className="pb-2 border-b border-white/10">VS Code / Eclipse / IntelliJ / Git</li>
                <li>レスポンシブWeb制作・UI/UX設計</li>
              </ul>
            </div>

            <div className="border border-white/10 p-6 bg-white/[0.01]">
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">
                BUSINESS & LANG
              </span>
              <h4 className="text-lg font-medium text-white mb-3">ビジネス・言語</h4>
              <ul className="text-xs font-mono text-white/70 space-y-2">
                <li className="pb-2 border-b border-white/10">Word / Excel / PowerPoint</li>
                <li className="pb-2 border-b border-white/10">日本語能力試験 JLPT N2（N1学習中）</li>
                <li>中国語（ネイティブ）</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. 学歴 (Education) */}
        <div className="space-y-8 pt-12 border-t border-white/15">
          <div className="text-xs font-mono tracking-widest text-white/40 uppercase">
            03 / EDUCATION
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <h4 className="text-lg font-medium text-white">早稲田文理専門学校</h4>
                <p className="text-xs font-mono text-white/60">学校法人中央情報学園 / アプリ・Web制作学科</p>
              </div>
              <span className="font-mono text-xs text-white/50">2025.04 — 2027.03 卒業見込み</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <h4 className="text-lg font-medium text-white">城東日本語学校</h4>
                <p className="text-xs font-mono text-white/60">卒業</p>
              </div>
              <span className="font-mono text-xs text-white/50">2023.10 — 2025.03</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <h4 className="text-lg font-medium text-white">楽山師範学院</h4>
                <p className="text-xs font-mono text-white/60">ビジュアルコミュニケーションデザイン専攻 / 卒業</p>
              </div>
              <span className="font-mono text-xs text-white/50">2014.09 — 2019.06</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <h4 className="text-lg font-medium text-white">中国四川省宜賓市第三高等学校</h4>
                <p className="text-xs font-mono text-white/60">卒業</p>
              </div>
              <span className="font-mono text-xs text-white/50">2011.09 — 2014.06</span>
            </div>
          </div>
        </div>

        {/* 4. 免許・保有資格 (Certifications) */}
        <div className="space-y-8 pt-12 border-t border-white/15">
          <div className="text-xs font-mono tracking-widest text-white/40 uppercase">
            04 / ACCREDITATIONS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-white/10 bg-white/[0.01] flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-white">ITパスポート試験 合格</span>
              <span className="font-mono text-xs text-white/40">2026.06</span>
            </div>
            <div className="p-4 border border-white/10 bg-white/[0.01] flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-white">文部科学省後援 情報検定 情報活用試験 3級</span>
              <span className="font-mono text-xs text-white/40">2025.12</span>
            </div>
            <div className="p-4 border border-white/10 bg-white/[0.01] flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-white">情報処理技能検定試験（表計算）3級</span>
              <span className="font-mono text-xs text-white/40">2025.12</span>
            </div>
            <div className="p-4 border border-white/10 bg-white/[0.01] flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-white">日本語能力試験（JLPT）N2 合格</span>
              <span className="font-mono text-xs text-white/40">2024.10</span>
            </div>
            <div className="p-4 border border-white/10 bg-white/[0.01] flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-white">レタリング技能検定 3級 合格</span>
              <span className="font-mono text-xs text-white/40">2024.06</span>
            </div>
          </div>
        </div>

        {/* 5. 自己PR・理念 (Statement) */}
        <div className="pt-12 border-t border-white/15">
          <div className="text-xs font-mono tracking-widest text-white/40 uppercase mb-4">
            05 / STATEMENT
          </div>
          <div className="max-w-3xl space-y-4 text-sm md:text-base text-white/80 leading-relaxed font-sans">
            <p className="text-xl font-medium text-white">
              「パッケージの開けやすさ・陳列のしやすさ」から、システムの「操作性・利便性」へ。
            </p>
            <p>
              前職のパッケージデザイナーとして約3年間で年間100件以上の案件に携わり、限られた印刷コストや物理的な構造の制約の中で、消費者が手に取りやすいユーザビリティと、製造ラインでの無理のない量産性を両立させる「実現性の高いデザイン」を追求してきました。
            </p>
            <p>
              現在は専門学校でJavaやSpring Bootを用いた開発を学び、単なるコードの機能面だけでなく、システム全体がリリース後の保守性や拡張性を担保しながら価値を提供し続ける視点を重視しています。デザインの実務経験にデジタルの知識を重ね、日本のクリエイティブ業界で価値を生み出していきます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
