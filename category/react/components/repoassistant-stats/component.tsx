const stats = [
  {
    value: "17+",
    label: "Projects shipped to production",
  },
  {
    value: "24h",
    label: "Fix & Deploy SLA, or refund",
  },
];
export function Stats() {
  return (
    <section className="bg-white rounded-xl px-3 py-12 lg:py-25">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <h2 className="text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4">
            Production work without the agency fog.
          </h2>
          <p className="text-lg text-neutral-500 mb-8 sm:mb-11 font-normal">
            We work from the repository you already have, solve the release
            blocker, and leave your team with a setup they can operate after
            handover.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="bg-neutral-100 rounded-2xl p-6 lg:p-8"
            >
              <span className="text-5xl lg:text-6xl font-medium text-neutral-900 block mb-3">
                {stat.value}
              </span>
              <p className="text-neutral-500 text-base font-normal">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
