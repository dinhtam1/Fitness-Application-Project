export const toastConfig = ({
  type = 'success',
  textMain,
  textSecond,
  position,
  visibilityTime,
  autoHide,
}) => {
  const config = {
    type,
    text1: textMain,
  };

  if (textSecond) config.text2 = textSecond;
  if (position) config.position = position;
  if (visibilityTime) {
    config.visibilityTime = visibilityTime;
    config.autoHide = true;
  }

  if (visibilityTime && autoHide) {
    config.visibilityTime = visibilityTime;
    config.autoHide = autoHide;
  }

  return config;
};
