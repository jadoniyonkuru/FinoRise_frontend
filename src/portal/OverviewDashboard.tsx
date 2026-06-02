import { useEffect, useState } from "react";
import styles from "./overview-dashboard.module.css";
import { adminService } from "@/api/services/admin.service";
import { modulesService } from "@/api/services/modules.service";
import { simulationsService } from "@/api/services/simulations.service";
import { rewardsService } from "@/api/services/rewards.service";

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function IconTool() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.1-3.1a6 6 0 0 1-7.9 7.9l-6.1 6.1a2.1 2.1 0 0 1-3-3l6.1-6.1a6 6 0 0 1 7.9-7.9l-3.1 3.1z" />
    </svg>
  );
}

function IconAward() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function IconDollar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconCpu() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

type DashboardData = {
  learners: number;
  modules: number;
  simulations: number;
  rewards: number;
  badges: number;
};

const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const monthlyRevenue = [89, 102, 96, 109, 114, 119, 125];
const trendValues = [78, 104, 98, 116, 136, 128, 148];

function DonutChart({ data }: { data: DashboardData }) {
  const distribution = [
    { label: "Learners", value: data.learners, color: "#1e3a8a" },
    { label: "Modules", value: data.modules, color: "#f2b23d" },
    { label: "Simulations", value: data.simulations, color: "#4187e8" },
    { label: "Rewards", value: data.rewards, color: "#8a56e8" },
  ];

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const total = distribution.reduce((sum, item) => sum + item.value, 0);
  let offset = circumference * 0.25;

  return (
    <div className={styles.donutArea}>
      <svg viewBox="0 0 180 180" className={styles.donutSvg}>
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#edf1f6" strokeWidth="22" />
        {distribution.map((item) => {
          const length = total > 0 ? (item.value / total) * circumference : 0;
          const dashOffset = offset;
          offset -= length;
          return (
            <circle
              key={item.label}
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="22"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={dashOffset}
            />
          );
        })}
        <text x="90" y="87" textAnchor="middle" className={styles.donutTotal}>
          {total.toLocaleString()}
        </text>
        <text x="90" y="107" textAnchor="middle" className={styles.donutLabel}>
          Total
        </text>
      </svg>

      <ul className={styles.legend}>
        {distribution.map((item) => (
          <li key={item.label}>
            <span className={styles.legendDot} style={{ background: item.color }} />
            <span>{item.label}</span>
            <strong>{item.value.toLocaleString()}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BarChart() {
  const max = Math.max(...monthlyRevenue);
  return (
    <svg viewBox="0 0 560 230" className={styles.chartSvg}>
      <defs>
        <linearGradient id="overviewBarGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d83e8" />
          <stop offset="100%" stopColor="#9dc9ff" />
        </linearGradient>
      </defs>
      {monthlyRevenue.map((value, index) => {
        const barHeight = (value / max) * 145;
        const x = 48 + index * 70;
        const y = 170 - barHeight;
        return (
          <g key={months[index]}>
            <text x={x + 17} y={y - 10} textAnchor="middle" className={styles.chartValue}>
              ${value}K
            </text>
            <rect x={x} y={y} width="34" height={barHeight} rx="6" fill="url(#overviewBarGradient)" />
            <text x={x + 17} y="205" textAnchor="middle" className={styles.axisLabel}>
              {months[index]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function LineChart() {
  const width = 560;
  const height = 190;
  const min = Math.min(...trendValues) - 10;
  const max = Math.max(...trendValues) + 10;
  const points = trendValues.map((value, index) => {
    const x = 34 + index * ((width - 68) / (trendValues.length - 1));
    const y = height - 38 - ((value - min) / (max - min)) * 110;
    return { x, y };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = [`${points[0].x},${height - 38}`, ...points.map((point) => `${point.x},${point.y}`), `${points[points.length - 1].x},${height - 38}`].join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={styles.chartSvg}>
      <defs>
        <linearGradient id="overviewLineArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d83e8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#3d83e8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#overviewLineArea)" />
      <polyline points={line} fill="none" stroke="#3d83e8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((point, index) => (
        <g key={months[index]}>
          <circle cx={point.x} cy={point.y} r="5" fill="#ffffff" stroke="#3d83e8" strokeWidth="3" />
          <text x={point.x} y="170" textAnchor="middle" className={styles.axisLabel}>
            {months[index]}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function OverviewDashboard() {
  const [data, setData] = useState<DashboardData>({ learners: 0, modules: 0, simulations: 0, rewards: 0, badges: 0 });

  useEffect(() => {
    Promise.all([
      adminService.getAnalytics(),
      modulesService.getAll(),
      simulationsService.getAll(),
      rewardsService.getAll(),
    ]).then(([analytics, modules, sims, rewards]) => {
      setData({
        learners: analytics.total_learners,
        modules: modules.length,
        simulations: sims.filter(s => s.is_published).length,
        rewards: rewards.filter(r => r.is_active).length,
        badges: analytics.total_badges_awarded,
      });
    }).catch(() => {});
  }, []);

  const stats = [
    { label: "Learners", value: data.learners.toLocaleString(), trend: "+6.3%", trendType: "up" as const, icon: <IconUsers />, color: "#1e40af" },
    { label: "Learning Modules", value: String(data.modules), trend: "+8.2%", trendType: "up" as const, icon: <IconBook />, color: "#c26a18" },
    { label: "Active Simulations", value: String(data.simulations), trend: "-2.4%", trendType: "down" as const, icon: <IconTool />, color: "#2563eb" },
    { label: "Reward Programs", value: String(data.rewards), trend: "+1", trendType: "neutral" as const, icon: <IconAward />, color: "#7c3aed" },
    { label: "Badges Awarded", value: data.badges.toLocaleString(), trend: "+12.5%", trendType: "up" as const, icon: <IconDollar />, color: "#1d4ed8" },
    { label: "AI Sessions", value: "—", trend: "+4.1%", trendType: "up" as const, icon: <IconCpu />, color: "#0891b2" },
  ];

  return (
    <section className={styles.root}>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <article key={stat.label} className={styles.statCard}>
            <div className={styles.statTop}>
              <span className={styles.statIcon} style={{ color: stat.color, backgroundColor: `${stat.color}14` }}>
                {stat.icon}
              </span>
              <span className={styles.trend} data-type={stat.trendType}>
                {stat.trend}
              </span>
            </div>
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </div>

      <div className={styles.analyticsGrid}>
        <article className={styles.panel}>
          <h2>Distribution Overview</h2>
          <DonutChart data={data} />
        </article>

        <article className={styles.panel}>
          <h2>Monthly Funding</h2>
          <BarChart />
          <p className={styles.panelNote}>
            Current month: <strong>RWF 4.2M</strong>
          </p>
        </article>

        <article className={styles.panel}>
          <h2>Learner Trend</h2>
          <LineChart />
          <p className={styles.panelNote}>
            Current month: <strong>{data.learners} active learners</strong>
          </p>
        </article>
      </div>
    </section>
  );
}
