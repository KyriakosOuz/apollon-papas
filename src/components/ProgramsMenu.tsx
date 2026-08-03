import type { PointerEvent as ReactPointerEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { PROGRAM_GROUPS, PROGRAM_MEDIA, SITE, programGroupId, type Program, type ProgramGroup } from '../config';
import { sectionHref, type Route } from '../router';
import { STATUS_CHIP } from './Programs';

// The Programs nav entry, as a dropdown rather than a plain anchor. Both levels
// are targets: the audience label jumps to that band of the Programs section,
// each program goes to its own page. The two unreleased ones have nowhere to
// point yet, so they render as plain rows with their status chip.
//
// One component for both placements. In the bar it is an absolutely positioned
// panel opened by hover or focus; inside the mobile nav panel the CSS drops it
// into the flow as an inline expander. The state lives in Nav either way.
export default function ProgramsMenu({
  route,
  open,
  setOpen,
  variant,
}: {
  route: Route;
  open: boolean;
  setOpen: (open: boolean) => void;
  variant: 'bar' | 'panel';
}) {
  const { t } = useTranslation();
  const bar = variant === 'bar';
  // Both variants are in the DOM at every width (the CSS hides one), so the id
  // aria-controls points at has to differ or neither reference resolves.
  const menuId = `programs-menu-${variant}`;

  const labelKey: Record<ProgramGroup, string> = {
    founders: 'programs.foundersLabel',
    students: 'programs.studentsLabel',
  };

  return (
    <div
      className="nav-dropdown"
      data-open={open}
      // Pointer open is a desktop affordance only; the panel variant is driven
      // entirely by taps. pointerleave cannot fire before pointerenter, so a
      // click that closes the menu is never immediately undone by the hover
      // still being inside the trigger.
      {...(bar
        ? {
            onPointerEnter: (e: ReactPointerEvent) => e.pointerType === 'mouse' && setOpen(true),
            onPointerLeave: (e: ReactPointerEvent) => e.pointerType === 'mouse' && setOpen(false),
          }
        : {})}
    >
      <button
        type="button"
        className="nav-dropdown-trigger"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={(e) => {
          // In the panel this sits inside the close-everything click handler.
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <span data-edit-id={bar ? 'nav.links.programs' : undefined} data-edit-key={bar ? 'nav.programs' : undefined}>
          {t('nav.programs')}
        </span>
        <span className="nav-caret" aria-hidden="true" />
      </button>

      {/* Picking anything in here navigates or scrolls, so the menu closes
          behind it. Without this the bar copy stays open under the pointer
          after a category jump, since the click never leaves the nav and so
          never trips the outside-click handler. Left to bubble on purpose: in
          the panel the same click also closes the panel. */}
      <div className="nav-dropdown-menu" id={menuId} hidden={!open} onClick={() => setOpen(false)}>
        {PROGRAM_GROUPS.map((group) => {
          const items = t(`programs.${group}`, { returnObjects: true }) as Program[];
          return (
            <div className="nav-dd-group" key={group}>
              <a className="nav-dd-label" href={sectionHref(route, programGroupId(group))}>
                {t(labelKey[group])}
              </a>
              {items.map((p) => {
                const media = PROGRAM_MEDIA[p.id] ?? {};
                const Tag = media.href ? 'a' : 'span';
                const newTab = !!media.href && SITE.programLinksNewTab;
                return (
                  <Tag
                    key={p.id}
                    className={'nav-dd-item' + (media.href ? '' : ' is-soon')}
                    {...(media.href ? { href: media.href } : {})}
                    {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="nav-dd-title">{p.title}</span>
                    <span className={STATUS_CHIP[p.status]}>{t(`programs.${p.status}`)}</span>
                  </Tag>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
