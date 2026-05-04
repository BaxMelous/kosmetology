import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="bg-slate-50">
      <section className="container mx-auto max-w-4xl px-4 py-20 text-center md:px-8 md:py-32">
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-12">
          <h1 className="text-3xl font-semibold text-slate-900 md:text-5xl">Страница не найдена</h1>
          <p className="mt-4 text-slate-500">
            Возможно, врач больше не отображается в каталоге или ссылка устарела.
          </p>
          <Link
            href="/doctors"
            className="mt-8 inline-flex items-center rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600"
          >
            Вернуться к специалистам
          </Link>
        </div>
      </section>
    </main>
  );
}
