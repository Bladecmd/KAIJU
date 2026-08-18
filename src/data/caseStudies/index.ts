import { CaseStudyData } from '../../types';
import { metroTaskForceCaseStudy } from './metro-task-force';
import { complianceLabsCaseStudy } from './compliance-labs';
import { audioBlueCaseStudy } from './audio-blue';
import { sovereignOsCaseStudy } from './sovereign-os';
import { sovereignSecurityCaseStudy } from './sovereign-security';
import { kaijuOsCaseStudy } from './kaiju-os';

export const allCaseStudies: CaseStudyData[] = [
  metroTaskForceCaseStudy,
  complianceLabsCaseStudy,
  audioBlueCaseStudy,
  sovereignOsCaseStudy,
  sovereignSecurityCaseStudy,
  kaijuOsCaseStudy,
];

export const caseStudyMap: Record<string, CaseStudyData> = {
  'metro-task-force': metroTaskForceCaseStudy,
  'compliance-labs': complianceLabsCaseStudy,
  'audio-blue': audioBlueCaseStudy,
  'sovereign-os': sovereignOsCaseStudy,
  'sovereign-security': sovereignSecurityCaseStudy,
  'kaiju-os': kaijuOsCaseStudy,
};

export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  return caseStudyMap[slug] || allCaseStudies.find((cs) => cs.slug === slug || cs.id === slug);
}
