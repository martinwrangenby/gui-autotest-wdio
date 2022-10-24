export const acceptCookiePopup = async () => {
  await $('#onetrust-accept-btn-handler').click();
  await expect($('#onetrust-accept-btn-handler')).not.toBeDisplayed();
};
