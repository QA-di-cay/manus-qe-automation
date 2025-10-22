import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '@opePortalBasePage';
import { GenericElement } from '@opePortalGeneEl';

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const makeNameRegex = (keyword: string) =>
  new RegExp(`^\\s*${escapeRegExp(keyword)}\\s*$`, 'i');

export class TicketSellModePage extends BasePage {
  readonly element: GenericElement;
  
  constructor(page: Page) {
    super(page, 'ticketSellModePage');
    this.element = new GenericElement(page);
  }

  //#region ====== LOCATORS ===================
  private get saveBtn(): Locator {
    return this.element.buttonByText('Save');
  }

  private ratioBtn(btnText: string): Locator {
    const re = makeNameRegex(btnText);
    return this.page.locator('label', { hasText: re });
  }
  //#endregion ================================

  //#region ====== GUARDS =====================
  protected async loadCondition(): Promise<void> {
    await Promise.all([
      expect(this.saveBtn).toBeVisible(),
      expect(this.ratioBtn('Between any Stops in system')).toBeVisible(),
      expect(this.ratioBtn('Between Stops of active Route')).toBeVisible(),
    ]);
  }
  //#endregion ================================

  //#region ====== INTERNAL HELPERS ===========
  private async isRatioBtnSelected(btnText: string): Promise<boolean> {
    const lbl = this.ratioBtn(btnText);
    await lbl.waitFor({ state: 'visible' });
    const radioDiv = lbl.locator('..');
    return await radioDiv.evaluate((el) => {
      const input = el.querySelector('input[type="radio"]');
      return el.classList.contains('v-item--active') ||
        (input?.getAttribute('aria-checked') === 'true');
    });
  }

  private async assertVisibleRatioBtn(btnText: string) {
    await expect(this.ratioBtn(btnText)).toBeVisible();
  }

  private async assertHiddenRatioBtn(btnText: string) {
    await expect(this.ratioBtn(btnText)).toBeHidden();
  }
  //#endregion ================================

  //#region ====== ASSERTIONS ==================
  async assertSaveRightAligned(tolerancePx: number): Promise<void> {
    const result = await this.saveBtn.evaluate((btn, tol) => {
      const container =
        btn.closest('section, main, form, .container, .container-fluid, .content, .v-card, .row, .col, div') || btn.parentElement!;
      const b = btn.getBoundingClientRect();
      const c = container.getBoundingClientRect();
      return {
        containerRight: c.right,
        buttonRight: b.right,
        delta: Math.max(0, c.right - b.right),
        isRightAligned: c.right - b.right <= tol
      };
    }, tolerancePx);

    expect.soft(result.isRightAligned, `Expected Save to be right-aligned (≤ ${tolerancePx}px from container right). Actual delta: ${result.delta}px`).toBeTruthy();
  }

  async assertNoOverlapAroundSave(): Promise<void> {
    const overlap = await this.saveBtn.evaluate((btn) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const elementAtPoint = document.elementFromPoint(cx, cy);
      const clickable = (element: Element | null): boolean =>
        !!element && (element === btn || btn.contains(element));
      return {
        elTag: elementAtPoint?.tagName,
        ok: clickable(elementAtPoint),
      };
    });

    expect.soft(overlap.ok, `Save appears overlapped (element at center: ${overlap.elTag}).`).toBeTruthy();
    await expect(this.saveBtn).toBeEnabled();
  }

  async assertSaveUsable(minWidth: number, minHeight: number): Promise<void> {
    const size = await this.saveBtn.evaluate((btn) => {
      const r = btn.getBoundingClientRect();
      return {
        w: Math.round(r.width),
        h: Math.round(r.height),
        inViewport:
          r.top >= 0 &&
          r.left >= 0 &&
          r.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          r.right <= (window.innerWidth || document.documentElement.clientWidth),
      };
    });
    expect.soft(size.w).toBeGreaterThanOrEqual(minWidth);
    expect.soft(size.h).toBeGreaterThanOrEqual(minHeight);
    expect.soft(size.inViewport, 'Save should be fully within the viewport.').toBeTruthy();
  }

  async clickRatioBtn(btnText: string): Promise<void> {
    await this.ratioBtn(btnText).waitFor({ state: 'visible' });
    await this.ratioBtn(btnText).click();
    const isSelected = await this.isRatioBtnSelected(btnText);
    await expect(isSelected).toBeTruthy();
  }

  async assertRatioBtn(): Promise<void> {
    await this.assertVisibleRatioBtn("Between any Stops in system");
    await this.assertVisibleRatioBtn("Between Stops of active Route");
    await this.assertVisibleRatioBtn("Stop List");

    if(await this.isRatioBtnSelected("Between any Stops in system")){
      await this.assertVisibleRatioBtn("Select Zone then Stops");
      await this.assertVisibleRatioBtn("Select Stop directly");
      if(await this.isRatioBtnSelected("Select Zone then Stops")){
        await this.assertVisibleRatioBtn("Route Stop List");
      }
      else{
        await this.assertHiddenRatioBtn("Route Stop List");
      }
    }
    if(await this.isRatioBtnSelected("Between Stops of active Route")){
      await this.assertHiddenRatioBtn("Select Zone then Stops");
      await this.assertHiddenRatioBtn("Select Stop directly");
      await this.assertVisibleRatioBtn("Route Stop List");
    }    
  }
  //#endregion =================================
}
