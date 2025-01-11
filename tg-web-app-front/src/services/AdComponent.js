const initializeAdSdk = async (id) => {
  if (!window.initCdTma) {
    throw new Error('Рекламный SDK не загружен.');
  }
  return await window.initCdTma({ id });
};

const adComponent = async (chatId, language, setAnimate, navigate) => {
  const id = '6029413'; // Ваш ID
  let showAd = null; // Локальная переменная вместо useRef

  try {
    if (!showAd) {
      const show = await initializeAdSdk(id);
      showAd = show; // Сохраняем метод показа рекламы
    }

    // Показываем рекламу
    await showAd();

    // Выполняем другие действия после успешного показа рекламы
    console.log('Реклама успешно показана!');
    setAnimate(true);
    navigate('/thank-you-page'); // Навигация на страницу
  } catch (err) {
    console.error('Ошибка показа рекламы:', err.message || err);
  }
};

export { adComponent };
