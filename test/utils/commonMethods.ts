export const acceptCookiePopup = async () => {
  const cookieAcceptButton = await $('#onetrust-accept-btn-handler');
  await cookieAcceptButton.click();
  await expect(cookieAcceptButton).not.toBeDisplayed();
};
