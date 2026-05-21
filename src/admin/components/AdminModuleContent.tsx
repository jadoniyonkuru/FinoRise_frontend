import styles from "@/components/StatCard.module.css";

type Stat = { label: string; value: string; hint: string };
type ListItem = { title: string; meta: string };

type Props = {
  stats: Stat[];
  panelTitle: string;
  items: ListItem[];
};

export default function AdminModuleContent({ stats, panelTitle, items }: Props) {
  return (
    <>
      <div className={styles.grid}>
        {stats.map((s) => (
          <div
            key={s.label}
            className={styles.card}
            data-accent
            style={{ "--accent": "var(--admin)" } as React.CSSProperties}
          >
            <div className={styles.label}>{s.label}</div>
            <div className={styles.value}>{s.value}</div>
            <div className={styles.hint}>{s.hint}</div>
          </div>
        ))}
      </div>
      <section className={styles.panel}>
        <h2>{panelTitle}</h2>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.title}>
              <span>{item.title}</span>
              <span>{item.meta}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
