import type { Preview, Project } from '../../content/work'
import { AuditMock } from './AuditMock'
import { BrowserFrame, PanelFrame } from './BrowserFrame'
import { EnquiriesChart } from './EnquiriesChart'
import { GoToMarket } from './GoToMarket'
import { LandingMock } from './LandingMock'
import { RecordMonth } from './RecordMonth'
import { RedesignMock } from './RedesignMock'

const browserMocks = {
  landing: { Mock: LandingMock, label: 'Concept landing page with a quote request form and drawing upload' },
  redesign: { Mock: RedesignMock, label: 'Concept website navigation organised by industry, application and product' },
  audit: { Mock: AuditMock, label: 'Concept measurement map from search to enquiry, with prioritised audit actions' },
}

const panels = {
  enquiries: {
    Panel: EnquiriesChart,
    title: 'Inbound sales enquiries per month',
    label: 'Bar chart: inbound enquiries rose from a previous monthly average of 10.7 to 24 in May and 30 in June',
  },
  record: {
    Panel: RecordMonth,
    title: 'Results',
    label: 'Best month on record: 21 form submissions and 16 qualified leads, against a target of 20 a month',
  },
  gtm: {
    Panel: GoToMarket,
    title: 'Go-to-market shift',
    label: 'Diagram: extending from the defence sector to design and R&D houses through positioning, content, landing pages, campaigns and KPIs',
  },
}

function isBrowserMock(p: Preview): p is keyof typeof browserMocks {
  return p in browserMocks
}

export function ProjectPreview({ project, className = '' }: { project: Project; className?: string }) {
  if (project.screenshot) {
    const shot = project.screenshot
    return (
      <BrowserFrame
        label={shot.alt}
        address={project.liveUrl?.replace(/^https?:\/\//, '') ?? project.client}
        className={className}
      >
        <img src={shot.src} width={shot.width} height={shot.height} alt="" loading="lazy" className="block h-auto w-full" />
      </BrowserFrame>
    )
  }
  const preview = project.preview
  if (!preview) {
    return (
      <div className={`on-dark flex aspect-[16/10] flex-col justify-end rounded-xl bg-navy p-6 sm:p-8 ${className}`}>
        <p className="text-sm font-medium text-on-navy-muted">{project.sector}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">{project.client}</p>
        {project.liveUrl && <p className="mt-3 text-sm text-on-navy-muted">{project.liveUrl.replace(/^https?:\/\//, '')}</p>}
      </div>
    )
  }
  if (isBrowserMock(preview)) {
    const { Mock, label } = browserMocks[preview]
    return (
      <BrowserFrame label={label} className={className}>
        <Mock />
      </BrowserFrame>
    )
  }
  const { Panel, title, label } = panels[preview]
  return (
    <PanelFrame label={label} title={title} className={className}>
      <Panel />
    </PanelFrame>
  )
}
