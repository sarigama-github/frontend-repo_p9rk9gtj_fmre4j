import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-2 items-center gap-8">
        <div className="relative z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200">Modern, minimalist, data-focused</span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Manage all your companies in one beautiful dashboard
          </h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300 max-w-xl">
            Search, filter, add and edit details with ease. Built with a soft blue theme, glassmorphism and a gentle 3D touch.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="#form" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-white font-medium shadow-sm hover:bg-blue-700">Add a company</a>
            <a href="#companies" className="inline-flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-2.5 font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800">Browse companies</a>
          </div>
        </div>
        <div className="relative h-[320px] sm:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden ring-1 ring-neutral-200/60 dark:ring-neutral-800/60 bg-gradient-to-tr from-blue-50 to-white">
          <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent dark:from-neutral-900/40" />
        </div>
      </div>
    </section>
  );
}
