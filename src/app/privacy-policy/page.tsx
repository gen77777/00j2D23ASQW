import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  alternates: { canonical: "/privacy-policy/" },
};

export default async function PrivacyPolicyPage() {
  const data = await getContent();

  return (
    <>
      <Header siteName={data.meta.siteName} />
      <main id="top" className="mx-auto min-h-screen max-w-2xl px-8 pt-40 pb-32 md:px-16">
        <h1 className="display-heading mb-12 text-4xl normal-case leading-tight">プライバシーポリシー</h1>

        <div className="flex flex-col gap-8 text-ink/80">
          <p>
            当サイトはメッセージへの返信に必要な最小限の情報のみを収集します。広告用クッキー、サードパーティの分析ツール、トラッキングピクセルは一切使用していません。
          </p>

          <section>
            <h2 className="eyebrow mb-3 block">お問い合わせフォーム</h2>
            <p>
              お問い合わせフォームを送信すると、リクエストに回答するために、お名前、メールアドレス、メッセージが保存されます。これがこの情報の唯一の用途であり、第三者と共有されることはありません。
            </p>
          </section>
          <section>
            <h2 className="eyebrow mb-3 block">セッション内の表示設定</h2>
            <p>オープニングアニメーションを繰り返さないため、表示済みかどうかをセッションストレージに保存します。この情報はサーバーには送信されません。</p>
          </section>
          <section>
            <h2 className="eyebrow mb-3 block">管理者アクセス</h2>
            <p>
              サイトのコンテンツエディターは、サイト所有者のサインインを維持するためだけに使用されるログインクッキーで保護されています。訪問者のトラッキングとは関係ありません。
            </p>
          </section>

          <section>
            <h2 className="eyebrow mb-3 block">お問い合わせ</h2>
            <p>このポリシーに関するご質問は、お問い合わせフォームから送信してください。</p>
          </section>
        </div>
      </main>
      <Footer data={data.footer} />
    </>
  );
}
