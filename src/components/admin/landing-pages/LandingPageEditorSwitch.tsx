'use client';

import {
  ProjectTemplateId,
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
} from '@/types/project-template';
import type { BlockType, LandingPageBlock } from '@/types/landing-page';
import MasterProjectTemplateEditor, {
  MasterProjectTemplateDraft,
} from '@/components/admin/MasterProjectTemplateEditor';
import MasterProjectTemplateV2Editor, {
  MasterProjectTemplateV2Draft,
} from '@/components/admin/MasterProjectTemplateV2Editor';
import MasterProjectTemplateV3Editor, {
  MasterProjectTemplateV3Draft,
} from '@/components/admin/MasterProjectTemplateV3Editor';
import { LegacyBlockEditor } from './LegacyBlockEditor';

interface LandingPageEditorSwitchProps {
  template: ProjectTemplateId;
  masterTemplate: MasterProjectTemplateDraft;
  setMasterTemplate: (
    _val:
      | MasterProjectTemplateDraft
      | ((_prev: MasterProjectTemplateDraft) => MasterProjectTemplateDraft)
  ) => void;
  masterTemplateV2: MasterProjectTemplateV2Draft;
  setMasterTemplateV2: (
    _val:
      | MasterProjectTemplateV2Draft
      | ((_prev: MasterProjectTemplateV2Draft) => MasterProjectTemplateV2Draft)
  ) => void;
  masterTemplateV3: MasterProjectTemplateV3Draft;
  setMasterTemplateV3: (
    _val:
      | MasterProjectTemplateV3Draft
      | ((_prev: MasterProjectTemplateV3Draft) => MasterProjectTemplateV3Draft)
  ) => void;
  sections: LandingPageBlock[];
  onAddBlock: (_type: BlockType) => void;
  onRemoveSection: (_id: string) => void;
  onMoveSection: (_index: number, _direction: 'up' | 'down') => void;
  onUpdateBlock: (_id: string, _updates: Partial<LandingPageBlock>) => void;
}

export function LandingPageEditorSwitch({
  template,
  masterTemplate,
  setMasterTemplate,
  masterTemplateV2,
  setMasterTemplateV2,
  masterTemplateV3,
  setMasterTemplateV3,
  sections,
  onAddBlock,
  onRemoveSection,
  onMoveSection,
  onUpdateBlock,
}: LandingPageEditorSwitchProps) {
  if (template === MASTER_PROJECT_TEMPLATE) {
    return (
      <MasterProjectTemplateEditor
        value={masterTemplate}
        onChange={setMasterTemplate}
      />
    );
  }

  if (template === MASTER_PROJECT_TEMPLATE_V2) {
    return (
      <MasterProjectTemplateV2Editor
        value={masterTemplateV2}
        onChange={setMasterTemplateV2}
      />
    );
  }

  if (template === MASTER_PROJECT_TEMPLATE_V3) {
    return (
      <MasterProjectTemplateV3Editor
        value={masterTemplateV3}
        onChange={setMasterTemplateV3}
      />
    );
  }

  return (
    <LegacyBlockEditor
      sections={sections}
      onAddBlock={onAddBlock as any} // The types match but BlockType in project-template vs landing-page might differ slightly in naming
      onRemoveSection={onRemoveSection}
      onMoveSection={onMoveSection}
      onUpdateBlock={onUpdateBlock}
    />
  );
}
