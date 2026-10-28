import type { Project } from '../../content/work'
import { AuditMock } from './AuditMock'
import { BrowserFrame } from './BrowserFrame'
import { LandingMock } from './LandingMock'
import { RedesignMock } from './RedesignMock'

const mocks = {
  landing: { Mock: LandingMock, label: 'Concept landing page with a quote request form and drawing upload' },
  redesign: { Mock: RedesignMock, label: 'Concept website navigation organised by industry, application and product' },
  audit: { Mock: AuditMock, label: 'Concept measurement map from search to enquiry, with prioritised audit actions' },
}

export function ProjectPreview({ project, className = '' }: { project: Project; className?: string }) {
  const { Mock, label } = mocks[project.preview]
  return (
    <BrowserFrame label={label} className={className}>
      <Mock />
    </BrowserFrame>
  )
}
