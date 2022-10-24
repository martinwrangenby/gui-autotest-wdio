import { acceptCookiePopup } from '../../utils/commonMethods';

describe('Page interaction', () => {
  beforeEach(async () => {
    // On a larger scale, these opening steps would probably fit better in a general hook method of sorts,
    // or cookie prompt should be handled under the hood. But for this assignment I'll just leave it as a suite hook
    await browser.url('/intl/v/car-safety/a-million-more');
    await acceptCookiePopup();
  });
  it('Carousel should rotate shown items when interacting with its next- and prev buttons', async () => {
    await $('h2=Explore our models').scrollIntoView();
    const carouselNextBtn = await $('[data-autoid="springCarouselNextButton"]');
    const carouselPrevBtn = await $('[data-autoid="springCarouselPreviousButton"]');
    const carouselItems = await $$('[data-autoid="springCarouselPane:carouselItem"]');

    // Inspecting the page, we see that elements one space outside what's dipslayed is still in viewport,
    // thus we check for 6:th element not to be displayed ([5]) and click twice to remove [0] from viewport
    await expect(carouselItems[0]).toBeDisplayedInViewport();
    await expect(carouselItems[5]).not.toBeDisplayedInViewport();

    await carouselNextBtn.click();
    await carouselNextBtn.click();
    await expect(carouselItems[0]).not.toBeDisplayedInViewport();
    await expect(carouselItems[5]).toBeDisplayedInViewport();

    await carouselPrevBtn.click();
    await carouselPrevBtn.click();
    await expect(carouselItems[0]).toBeDisplayedInViewport();
    await expect(carouselItems[5]).not.toBeDisplayedInViewport();
  });
  it('Pausing autoplay video should replace pause button with play button and vice versa', async () => {
    await $('[aria-label="pause"]').click();
    await expect($('[aria-label="pause"]')).not.toBeDisplayedInViewport();

    await $('[aria-label="play"]').click();
    await expect($('[aria-label="play"]')).not.toBeDisplayed();
  });
});
