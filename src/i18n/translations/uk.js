export const uk = {
  translation: {
    welcomeSection: {
      main_title: 'Трекер споживання води',
      second_title: 'Фіксуй та стеж за щоденним вживанням води ',
    },
    common: {
      try_tracker: 'Спробувати трекер',
      sign_in: 'Увійти',
      sign_up: 'Реєстрація',
      sign_in_google: 'Увійти з Google',
      sign_up_google: 'Реєстрація з Google',
      email_label: 'Електронна пошта',
      password_label: 'Пароль',
      repeat_password_label: 'Повторіть пароль',
      add_water: 'Додай воду',
      save: 'Зберегти',
      saving: 'Збереження...',
      log_out: 'Вийти',
      cancel: 'Відміна',
      settings: 'Опції',
      send_email: 'Відправити імейл',
      go_home: 'На Головну',
      delete: 'Видалити',
      deleting: 'Видалення...',
      change_pwd: 'Змінити пароль',
    },

    advantagesSection: {
      customers_text: `{{count}} <span class={{class}}>щасливі</span> користувачі`,

      habit_drive: 'Драйв звичок',
      view_statistic: ' Статистика',
      personal_rate_setting: 'Особисті налаштування',
    },

    validation: {
      invalid_email: 'Невірна адреса електронної пошти',
      valid_email: 'Введіть дійсну електронну адресу',
      email_min: 'Email повинен містити мінімум 3 символи',
      email_max: 'Email не може перевищувати 50 символів',
      email_required: "Email є обов'язковим",
      password_min: 'Пароль повинен містити мінімум 3 символи',
      password_max: 'Пароль не може перевищувати 50 символів',
      password_required: "Пароль є обов'язковим",
      password_match: 'Паролі повинні співпадати',
      valid_time: 'Введіть правильний формат часу',
      number_amount: 'Кількість повинна бути числом',
      time_required: "Час є обов'язковим",
      future_time_error:
        'Не можна додати запис про споживання води на майбутній час сьогодні',
      number_positive: 'Сума повинна бути більше 0',
      number_min: "Об'єм води не може бути менше 50 мл",
      number_max: "Об'єм води не може перевищувати 5000 мл",
      water_required: "Об'єм води є обов'язковим",
      gender: 'Будь ласка, оберіть стать',
      name_required: "Ім'я є обов'язковим",
      name_contain: "Ім'я повинно містити лише літери",
      water_min: 'Добова норма води має бути не менше {{min}} л',
      water_max: 'Добова норма води не може перевищувати {{max}} л',
    },

    commonUserValidation: {
      number: '{{field}} має бути числом',
      required: "{{field}} є обов'язковим полем",
      positive: '{{field}} має бути додатнім числом',
      min: '{{field}} має бути не менше {{min}}',
      max: '{{field}} не може перевищувати {{max}}',
    },
    values: {
      activeTime: 'Час активних занять спортом',
      waterNorm: 'Добова норма води',
      weight: 'Вага',
    },

    notifications: {
      hello: 'Привіт, ',
      user_name: '{{user}}!',
      welcome: 'Вітаємо, {{email}}!',
      enter_email: 'Введіть свою електронну пошту',
      enter_password: 'Введіть свій пароль',
      repeat_password: 'Повторіть свій пароль',
      signing_up: 'Триває реєстрація...',
      want_leave: 'Ви дійсно хочете піти?',
      email_sent: 'Імейл з інструкціями щодо зміни паролю надіслано!',
      water_updated: 'Успішно оновлено запис про воду!',
      water_added: 'Запис про воду успішно додано!',
      check_email: 'Будь ласка, перевірте вашу електронну пошту',
      changed_password: 'Пароль успішно змінено!',
      water_deleted: 'Запис про воду успішно видалено!',
      data_updated: 'Ваші дані успішно збережені!',
      Password_was_successfully_reset_: 'Пароль успішно змінено!',
    },
    signInForm: {
      without_account: 'Не маєте акаунту?',
      help: 'Допомогти?',
      reset_password: 'Скинути пароль',
      wrong_pwd_in_signin: 'Невірний пароль, будь ласка спробуйте ще раз',
    },
    signUpForm: {
      with_account: 'Вже маєте акаунт?',
    },
    waterModal: {
      entered_data: 'Виправте введені дані:',
      choose_value: 'Оберіть значення',
      edit_entered_amount: "Редагуйте введений об'єм <br /> води",
      water_amount: "Об'єм води",
      record_time: 'Час запису',
      enter_water_value: "Введіть об'єм спожитої води",
    },
    trackerPage: {
      daily_norm_value: '{{dailyWaterNormInLiters}} Л',
      daily_norm: 'Денна норма',
      today: 'Сьогодні',
      month_general: 'Місяць',
      statistics: 'Статистика',
      currentWeek: 'Поточний тиждень',
      week: 'Тиждень {{weekNumber}}',
      liters: '{{value}} Л',
    },
    settingModal: {
      no_img: 'Фото відсутнє',
      upload_img: 'Завантажити фото',
      gender_identity: 'Ваша стать',
      woman: 'Жінка',
      man: 'Чоловік',
      your_name: "Ваше Ім'я",
      for_woman: 'Для жінки',
      for_man: 'Для чоловіка',
      v_m_t_description:
        'V - обсяг норми води в літрах на добу, M - ваша маса тіла, T - час активних занять спортом, або іншого виду активності, співмірного за навантаженнями (у разі відсутності таких, потрібно поставити 0)',
      active_time: 'Активний час у годинах',
      weight: 'Ваша вага в кілограмах',
      sport_time: 'Час активних занять спортом',
      recommend_water_intake: 'Рекомендована норма води на день',
      how_much_will_drink: 'Запишіть, скільки води ви будете пити',
    },
    deleteWaterModal: {
      delete_entry: 'Видалення запису',
      are_you_sure: 'Ви впевнені, що хочете видалити запис?',
    },
    changePasswordPage: {
      change_pwd: 'Змініть свій пароль',
      new_password: 'Новий пароль',
      enter_new_pwd: 'Введіть новий пароль',
      repeat_new_pwd: 'Повторіть новий пароль',
    },
    errors: {
      failed_change_pwd: 'Не вдалося змінити пароль. Спробуйте ще раз!',
      Failed_to_send_the_email_please_try_again_later:
        'Не вдалося відправити імейл, будь ласка, повторіть спробу пізніше',
      try_again: 'Будь ласка, спробуйте ще раз',
      try_again_wrong: 'Будь ласка, спробуйте пізніше, щось пішло не так',
      Email_is_in_use: 'Електронна пошта вже використовується',
      User_not_found: 'Користувача не знайдено',
      no_response: 'Відсутня відповідь',
      Session_not_found: 'Сесію не знайдено',
      Session_token_expired: 'Термін дії токену сесії закінчився',
      error_deleting_record: 'Помилка видалення запису: {{error}}',
      Request_failed_with_status_code_404:
        'Запит виконано невдало з кодом стану 404',
      Water_record_not_found: 'Запис про воду не знайдено',
    },
    waterList: {
      cannot_record:
        'Ви не можете додати запис про споживання води на майбутню дату.',
      select_valid_date: 'Будь ласка, оберіть дійсну дату.',
      nothing_here: 'Схоже, тут ще нічого немає.',
      click_addWater:
        'Натисніть «Додати воду», щоб зафіксувати споживання води за цей день.',
    },
    notFoundPage: {
      not_found: 'Сторінку Не Знайдено',
      sorry: 'На жаль, сторінка, яку ви шукаєте, не існує.',
      go_home: 'Повернутися На Головну',
    },
    months: {
      January: 'Січень',
      February: 'Лютий',
      March: 'Березень',
      April: 'Квітень',
      May: 'Травень',
      June: 'Червень',
      July: 'Липень',
      August: 'Серпень',
      September: 'Вересень',
      October: 'Жовтень',
      November: 'Листопад',
      December: 'Грудень',
    },
    tourSteps: {
      thank_you: 'Дякуємо за реєстрацію!',
      track_water: 'З нами легко відстежувати споживання води!',
      built:
        'Створенно з пристрастю командою талановитих розробників, спеціально для вас!',
      daily_water_goal:
        'Ось тут ваша щоденна мета по воді. Намагайтеся досягати її щодня!',
      current_water_intake:
        'Тут відображається поточне споживання води за сьогодні або обрану дату.',
      add_new_portion: 'Натисніть тут, щоб додати нову порцію води!',
      or_add_new_portion: 'Або натисніть тут, щоб додати нову порцію води!',
      settings: 'Натисніть тут, щоб керувати своїм профілем та налаштуваннями!',
      consumed_water: 'Тут ви можете побачити кількість спожитої води!',
      monthly_progress:
        'Відстежуйте свій щомісячний прогрес - кожне коло показує щоденний відсоток виконання норми споживання.',
      consumption_chart:
        'Натисніть тут, щоб переглянути графік споживання води!',
    },
  },
};
