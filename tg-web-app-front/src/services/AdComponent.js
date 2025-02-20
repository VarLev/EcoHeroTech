import { updateUserBalanceAndEcha, getUserByChatId } from './userService';
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
      let amount;
      if (language === 'ru') {
        amount = (Math.random() * (0.36 - 0.25) + 0.25).toFixed(2);
      } else {
        amount = (Math.random() * (0.0042 - 0.0029) + 0.0029).toFixed(4);
      }
      const echaCoins = 5000;
      console.log('Amount:', amount);
      console.log('before updateUserBalanceAndEcha');
await updateUserBalanceAndEcha(chatId, parseFloat(amount), echaCoins);
console.log('after updateUserBalanceAndEcha');

      // Получение текущего количества echaCoins после обновления
      const updatedData = await getUserByChatId(chatId);
      const updatedEchaCoins = parseFloat(updatedData.echaCoins);

      console.log(`Ad success - updated EchaCoins: ${updatedEchaCoins}`);
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
