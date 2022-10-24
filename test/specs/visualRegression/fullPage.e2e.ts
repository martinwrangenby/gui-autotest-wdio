import { acceptCookiePopup } from '../../utils/commonMethods';

describe('Example', () => {
  beforeEach(async () => {
    await browser.url('/intl/v/car-safety/a-million-more');
    await acceptCookiePopup();
  });

  it('Generate baseline screenshots if missing', async () => {
    await browser.saveFullPageScreen('fullPage', {
      // Since autoplayed videos doesn't play well with visual regression tests it's removed from baseline and comparison
      hideElements: [await $('[data-autoid="Video-1"]')],
    });
  });

  it('Page should not differ from the baseline screenshots', async () => {
    await expect(
      await browser.checkFullPageScreen('fullPage', {
        hideElements: [await $('[data-autoid="Video-1"]')],
      })
    ).toEqual(0);
  });
});
