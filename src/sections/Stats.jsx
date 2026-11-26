import CountUp from '../components/reactbits/CountUp';
import { stats } from '../content';

export default function Stats() {
  return (
    <section className="section stats">
      <div className="container stats__grid">
        {stats.map(s => (
          <div className="stat" key={s.label}>
            <p className="stat__num">
              <CountUp to={s.value} duration={2.2} />
              <span>{s.suffix}</span>
            </p>
            <p className="stat__label">{s.label}</p>
          </div>
        ))}
      </div>
      {import.meta.env.DEV && <p className="draft-note container">DRAFT: angka di atas masih contoh, ganti di src/content.js sebelum rilis.</p>}
    </section>
  );
}
