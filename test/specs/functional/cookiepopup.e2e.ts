describe('Cookie Popup', () => {
  it('Cookie popup should appear when landing on page and disappear when clicked', async () => {
    await browser.url('/intl/v/car-safety/a-million-more');
    await expect($('#onetrust-accept-btn-handler')).toBeDisplayed();
    await $('#onetrust-accept-btn-handler').click();
    await expect($('#onetrust-accept-btn-handler')).not.toBeDisplayed();
  });
});
