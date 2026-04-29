import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { PointMaterial, Points } from '@react-three/drei'
import { motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Cpu,
  Gauge,
  LineChart,
  Network,
  Radar,
  Shield,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Feature = {
  title: string
  description: string
  tags: string[]
  icon: LucideIcon
}

type Module = {
  name: string
  summary: string
  badges: string[]
  signals: string[]
  kpis: string[]
}

type TimelineStep = {
  title: string
  detail: string
}

const stats = [
  { label: 'Edge ↔ quantum latency', value: '12µs', note: 'round-trip, measured at 42 sites' },
  { label: 'Resilience window', value: '99.995%', note: 'self-healing control mesh' },
  { label: 'Fabric bandwidth', value: '4.3 Tbps', note: 'encrypted interconnect' },
  { label: 'Active QEC budget', value: '1.8e-6 AQL', note: 'continuous stabilisation' },
]

const signals = [
  'Live mesh · 42 nodes',
  'Cohérence stabilisée · 98.2%',
  'Charge thermique · 87% régulée',
  'Runbook zero-downtime actif',
]

const features: Feature[] = [
  {
    title: 'Convergence quantique-classique',
    description:
      'Orchestration déterministe, aware du bruit, pour piloter des workloads hybrides à latence ultra-basse.',
    tags: ['Mesh aware', 'QEC hooks', 'Edge ready'],
    icon: Network,
  },
  {
    title: 'Pipeline temps-réel',
    description:
      'Stream de télémétrie haute fréquence, scoring automatique et réallocation en moins de 50 ms.',
    tags: ['Observabilité', 'Autoscaling', 'Failover'],
    icon: Gauge,
  },
  {
    title: 'Sûreté opérée',
    description:
      'Contrôles cryptés, attestations continues et sandbox matériel pour protéger les plans de contrôle.',
    tags: ['ZK attestations', 'ACR', 'Isolation'],
    icon: Shield,
  },
  {
    title: 'Spaces adaptatifs',
    description:
      'Cartographie vivante des qubits, zones thermiques et flux classiques pour guider chaque commande.',
    tags: ['Topologie', 'Telemetry cloud', 'Predictive'],
    icon: Sparkles,
  },
  {
    title: 'Synthesis Engine',
    description:
      'Compilation multi-backend avec calibration en ligne et optimisation progressive pour la cohérence.',
    tags: ['Dynamic recompilation', 'Noise maps', 'Stability'],
    icon: Cpu,
  },
  {
    title: 'Insight Fabric',
    description:
      'Dashboards sécurisés, traces corrélées et alerting préventif pour chaque nœud et lien du réseau.',
    tags: ['Anomaly', 'Trace heatmaps', 'Ops ready'],
    icon: LineChart,
  },
]

const modules: Module[] = [
  {
    name: 'Nexus Core',
    summary: 'Plan de contrôle, admission, sécurité et synchronisation des commandes quantiques-classiques.',
    badges: ['Zero-downtime', 'Multi-tenant', 'Encrypted mesh'],
    signals: ['Priorité dynamique', 'Handoff crypté', 'Isolation des canaux'],
    kpis: ['Temps de lock < 5µs', 'SLA 99.995%', 'RPO = 0'],
  },
  {
    name: 'Synthesis Engine',
    summary: 'Compilation, calibration continue et exécution paramétrée des workloads hybrides.',
    badges: ['Gradient aware', 'Backends multiples', 'Profilage live'],
    signals: ['Graphes optimisés', 'Recompilation ciblée', 'Contrôles en vol'],
    kpis: ['Gain cohérence +18%', 'Drift < 0.2%', 'Autocalibration 90s'],
  },
  {
    name: 'Edge Relay',
    summary: 'Orchestration locale, buffering intelligent et routage prioritaire vers le tissu quantique.',
    badges: ['Edge hardened', 'QoS mesh', 'Failsafe'],
    signals: ['Délai garanti', 'Routage adaptatif', 'Cache critique'],
    kpis: ['12µs RTT', '0 packet loss', 'Burst x3 absorbé'],
  },
]

const timeline: TimelineStep[] = [
  { title: 'Provisioning', detail: 'Découverte du tissu, attestation, activation du contrôle zéro-trust.' },
  { title: 'Streaming & sensing', detail: 'Ingestion télémétrique, calibration et bascule en mode actif.' },
  { title: 'Execution', detail: 'Orchestration hybride, priorisation temps-réel, réponses signées.' },
  { title: 'Stability loop', detail: 'Supervision thermique, correctifs QEC continus, reroute intelligent.' },
]

function StarField() {
  const points = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const count = 1400
    const arr = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const radius = 2 + (i % 18) * 0.08 + (i / count) * 3.8
      const theta = (i * 137.508) * (Math.PI / 180)
      const phi = Math.acos(1 - 2 * ((i + 0.5) / count))
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      arr.set([x, y, z], i * 3)
    }

    return arr
  }, [])

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.05
      points.current.rotation.x -= delta * 0.02
    }
  })

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#7dd3fc" size={0.035} sizeAttenuation depthWrite={false} />
    </Points>
  )
}

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

function App() {
  return (
    <main className="page">
      <header className="hero">
        <div className="hero-glow" />
        <div className="hero-grid" />
        <div className="constellation">
          <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.55} />
            <StarField />
          </Canvas>
        </div>

        <div className="container hero-inner">
          <motion.div className="tagline" {...fadeIn}>
            <span className="pulse" />
            Nexus Fabric · Beta channel 7.3 · Continuous delivery activé
          </motion.div>

          <div className="hero-grid-layout">
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.05 }}>
              <h1 className="headline">
                L&apos;interface temps-réel pour <span>piloter le continuum quantique-classique</span>.
              </h1>
              <p className="lede">
                Nexus synchronise les charges critiques, stabilise la cohérence et expose un plan de contrôle
                unifié — de l&apos;edge aux processeurs quantiques — avec une observabilité continue et des
                garde-fous cryptés.
              </p>

              <div className="cta-row">
                <button className="button" type="button">
                  <ArrowRight size={18} />
                  Lancer l&apos;interface
                </button>
                <button className="button secondary" type="button">
                  <Sparkles size={18} />
                  Voir les patterns
                </button>
              </div>

              <div className="chip-row" style={{ marginTop: 18 }}>
                <span className="chip">Latency aware</span>
                <span className="chip">Mesh sécurisé</span>
                <span className="chip">Observabilité temps réel</span>
              </div>
            </motion.div>

            <motion.div className="hero-aside" {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.1 }}>
              {signals.map((signal) => (
                <div className="signal-card" key={signal}>
                  <span className="signal-dot" />
                  <div>
                    <div style={{ fontWeight: 600 }}>{signal}</div>
                    <div className="muted" style={{ fontSize: '0.92rem' }}>
                      Synchronisé via le plan de contrôle Nexus
                    </div>
                  </div>
                </div>
              ))}

              <div className="panel">
                <div className="pill">Pilier opératoire</div>
                <h3>Stability Loop</h3>
                <p>
                  Routines de stabilisation, reroute dynamique, scoring des environnements et exécution sécurisée
                  des commandes hybrides.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="muted" style={{ marginBottom: 6 }}>
                Maillage opérationnel
              </p>
              <h2 className="section-title">Les indicateurs en continu</h2>
            </div>
            <div className="band">
              <Activity size={18} />
              <span className="mono">Telemetry live · 15 régions · 4 plans actifs</span>
            </div>
          </div>

          <div className="stat-grid">
            {stats.map((stat) => (
              <motion.div key={stat.label} className="stat-card" {...fadeIn}>
                <div className="stat-value">{stat.value}</div>
                <div className="muted" style={{ marginBottom: 6 }}>
                  {stat.label}
                </div>
                <div className="pill">{stat.note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="muted" style={{ marginBottom: 6 }}>
                Architecture Nexus
              </p>
              <h2 className="section-title">Ce que l&apos;interface expose</h2>
            </div>
            <span className="pill">Interopérable · Cloud + Edge · Zero trust</span>
          </div>

          <div className="card-grid">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  className="feature-card"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                >
                  <div className="icon-pill">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>{feature.title}</h3>
                    <p className="muted" style={{ margin: '6px 0 0' }}>
                      {feature.description}
                    </p>
                  </div>
                  <div className="tags">
                    {feature.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="muted" style={{ marginBottom: 6 }}>
                Du provisioning à l&apos;exécution
              </p>
              <h2 className="section-title">Pipeline Nexus</h2>
            </div>
            <span className="pill">Trace complet · Drift-aware · SLA garanti</span>
          </div>

          <div className="section-split">
            <div className="module-grid">
              {modules.map((module) => (
                <motion.div key={module.name} className="module-card" {...fadeIn}>
                  <div className="module-meta">
                    {module.badges.map((badge) => (
                      <span key={badge} className="pill">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3 style={{ margin: 0 }}>{module.name}</h3>
                  <p className="muted" style={{ margin: '6px 0' }}>
                    {module.summary}
                  </p>
                  <ul className="list">
                    {module.signals.map((item) => (
                      <li key={item}>
                        <span className="bullet" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="band">
                    <Radar size={16} />
                    <span className="mono">{module.kpis.join(' · ')}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="timeline">
              {timeline.map((step, idx) => (
                <motion.div
                  key={step.title}
                  className="timeline-step"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <div className="band" style={{ marginBottom: 10 }}>
                    <Gauge size={16} />
                    <span className="mono">Étape {idx + 1}</span>
                  </div>
                  <h3 style={{ margin: 0 }}>{step.title}</h3>
                  <p className="muted" style={{ margin: '6px 0 0' }}>
                    {step.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="cta-banner">
            <div>
              <div className="pill">Mode live</div>
              <h3 style={{ margin: '6px 0' }}>Tester Nexus en environnement de pré-prod sécurisé</h3>
              <p className="muted" style={{ margin: 0 }}>
                Accès restreint, observabilité complète, rollback instantané si nécessaire.
              </p>
            </div>
            <div className="cta-row">
              <button className="button" type="button">
                <ArrowRight size={18} />
                Ouvrir le runbook
              </button>
              <button className="button secondary" type="button">
                <Shield size={18} />
                Audit cryptographique
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
