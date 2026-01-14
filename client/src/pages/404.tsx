export default function NotFound() {
  return (
    <main className="relative isolate h-fit">
      <img
        alt=""
        src="/images/news.jpg"
        className="absolute inset-0  -z-10 size-full object-cover object-top"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-base/8 font-semibold text-white">404</p>
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg md:text-xl font-medium text-pretty text-white/90 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex justify-center">
          <a href="/home" className="text-sm/7 md:text-base font-semibold text-white hover:text-white/90">
            <span aria-hidden="true">&larr;</span> Back to home
          </a>
        </div>
      </div>
    </main>
  )


}

