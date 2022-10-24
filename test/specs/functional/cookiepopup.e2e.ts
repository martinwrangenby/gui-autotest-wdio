describe('Cookie Popup', () => {
  it('Cookie popup should appear when landing on page and disappear when clicked', async () => {
    await browser.url('/intl/v/car-safety/a-million-more');
    const cookieAcceptButton = await $('#onetrust-accept-btn-handler');
    await expect(cookieAcceptButton).toBeDisplayed();
    await cookieAcceptButton.click();
    await expect(cookieAcceptButton).not.toBeDisplayed();
  });
});
