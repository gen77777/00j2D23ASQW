"use client";

import type { ContentData } from "@/types/content";

type ResumeData = ContentData["resume"];

function TextField({ label, value, onChange, multiline = false }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const className = "w-full border border-white/20 bg-[#131313] p-3 text-sm text-white focus:border-white/60 focus:outline-none";
  return (
    <label className="flex flex-col gap-2 text-xs text-gray-400">
      {label}
      {multiline ? (
        <textarea className={`${className} min-h-24 resize-y`} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className={className} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

export default function ResumeEditor({ data, onChange }: { data: ResumeData; onChange: (data: ResumeData) => void }) {
  return (
    <section className="mb-12 rounded-lg border border-white/10 bg-[#1b1b1b] p-6 shadow-xl md:p-8">
      <h2 className="mb-6 border-b border-white/10 pb-4 text-xl font-bold text-white/90">プロフィール・経歴</h2>
      <div className="space-y-6">
        {([['eyebrow', 'セクションラベル'], ['headline', '見出し'], ['intro', '自己紹介']] as const).map(([key, label]) => (
          <TextField key={key} label={label} value={data[key]} multiline={key === 'intro'} onChange={(value) => onChange({ ...data, [key]: value })} />
        ))}
        {([['experience', '職務経歴'], ['education', '学歴']] as const).map(([key, label]) => (
          <div key={key} className="space-y-4 border-t border-white/10 pt-6">
            <h3 className="font-semibold">{label}</h3>
            {data[key].map((entry, index) => (
              <div key={entry.id} className="space-y-4 border border-white/10 p-4">
                {([['period', '期間'], ['title', '会社・学校名'], ['subtitle', '所属・専攻・雇用形態']] as const).map(([field, fieldLabel]) => (
                  <TextField key={field} label={fieldLabel} value={entry[field]} onChange={(value) => onChange({
                    ...data,
                    [key]: data[key].map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
                  })} />
                ))}
                <TextField label="詳細（1行につき1項目）" value={entry.details.join('\n')} multiline onChange={(value) => onChange({
                  ...data,
                  [key]: data[key].map((item, itemIndex) => itemIndex === index ? { ...item, details: value ? value.split('\n') : [] } : item),
                })} />
                <button type="button" className="text-sm text-red-400" onClick={() => onChange({ ...data, [key]: data[key].filter((_, itemIndex) => itemIndex !== index) })}>削除</button>
              </div>
            ))}
            <button type="button" className="border border-white/20 px-4 py-2 text-sm hover:bg-white/10" onClick={() => onChange({
              ...data,
              [key]: [...data[key], { id: `${key}-${crypto.randomUUID()}`, period: '', title: '', subtitle: '', details: [] }],
            })}>＋ {label}を追加</button>
          </div>
        ))}
        <div className="space-y-4 border-t border-white/10 pt-6">
          <h3 className="font-semibold">資格</h3>
          {data.qualifications.map((entry, index) => (
            <div key={entry.id} className="grid gap-4 border border-white/10 p-4 md:grid-cols-[1fr_3fr_auto] md:items-end">
              {([['period', '取得年月'], ['title', '資格名']] as const).map(([field, label]) => (
                <TextField key={field} label={label} value={entry[field]} onChange={(value) => onChange({
                  ...data,
                  qualifications: data.qualifications.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
                })} />
              ))}
              <button type="button" className="py-3 text-sm text-red-400" onClick={() => onChange({ ...data, qualifications: data.qualifications.filter((_, itemIndex) => itemIndex !== index) })}>削除</button>
            </div>
          ))}
          <button type="button" className="border border-white/20 px-4 py-2 text-sm hover:bg-white/10" onClick={() => onChange({
            ...data,
            qualifications: [...data.qualifications, { id: `qualification-${crypto.randomUUID()}`, period: '', title: '' }],
          })}>＋ 資格を追加</button>
        </div>
      </div>
    </section>
  );
}
