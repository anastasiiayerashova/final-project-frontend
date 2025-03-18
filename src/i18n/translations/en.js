export const en = {
  translation: {
    welcomeSection: {
      main_title: 'Water consumption tracker',
      second_title: 'Record daily water intake and track',
    },

    common: {
      try_tracker: 'Try tracker',
      sign_in: 'Sign In',
      sign_up: 'Sign Up',
      sign_in_google: 'Sign in with Google',
      sign_up_google: 'Sign up with Google',
      email_label: 'Email',
      password_label: 'Password',
      repeat_password_label: 'Repeat Password',
      add_water: 'Add water',
      save: 'Save',
      saving: 'Saving...',
      log_out: 'Log out',
      cancel: 'Cancel',
      settings: 'Setting',
      send_email: 'Send email',
      go_home: 'Go Home',
      delete: 'Delete',
      deleting: 'Deleting...',
      change_pwd: 'Change password',
      help: 'Help',
    },
    advantagesSection: {
      customers_text: `{{count}} <span class={{class}}>happy</span> customers`,

      habit_drive: 'Habit drive',
      view_statistic: 'View statistics',
      personal_rate_setting: 'Personal rate setting',
    },

    validation: {
      invalid_email: 'Invalid email address',
      valid_email: 'Enter a valid email',
      email_min: 'Email must be at least 3 characters',
      email_max: 'Email cannot exceed 50 characters',
      email_required: 'Email is required',
      password_min: 'Password must be at least 3 characters',
      password_max: 'Password cannot exceed 50 characters',
      password_required: 'Password is required',
      password_match: 'Passwords must match',
      valid_time: 'Enter a valid time format',
      number_amount: 'Amount must be a number',
      time_required: 'Time is required',
      future_time_error:
        'You cannot log water consumption for a future time today',
      number_positive: 'Amount must be greater than 0',
      number_min: 'Amount of water must be at least 50 ml',
      number_max: 'Amount of water cannot exceed 5000 ml',
      water_required: 'Amount of water is required',
      gender: 'Please select your gender',
      name_required: 'Name is required',
      name_contain: 'Name must contain only letters',
      water_min: 'Daily water norm must be at least {{min}} L',
      water_max: 'Daily water norm cannot exceed {{max}} L',
      settings_name_min: 'Name must be at least 3 characters',
      settings_name_max: 'Name cannot exceed 12 characters',
    },

    commonUserValidation: {
      number: '{{field}} must be a number',
      required: '{{field}} is required',
      positive: '{{field}} must be positive',
      min: '{{field}} must be at least {{min}}',
      max: '{{field}} cannot exceed {{max}}',
    },
    values: {
      activeTime: 'Active sport time ',
      waterNorm: 'Daily water norm',
      weight: 'Weight',
    },
    notifications: {
      hello: 'Hello, ',
      user_name: '{{user}}!',
      welcome: 'Welcome, {{email}}!',
      enter_email: 'Enter your email',
      enter_password: 'Enter your password',
      repeat_password: 'Repeat your password',
      signing_up: 'Signing up...',
      want_leave: 'Do you really want to leave?',
      email_sent: 'Email with password reset instructions sent!',
      water_updated: 'Water record updated successfully!',
      water_added: 'Water record added successfully!',
      water_deleted: 'Water record successfully deleted!',
      check_email: 'Please, check your email',
      changed_password: 'Password changed successfully!',
      data_updated: 'Your data was successfully updated!',
      Password_was_successfully_reset_: 'Password was successfully reset!',
    },
    signInForm: {
      without_account: 'Don’t have an account?',
      help: 'Need help?',
      reset_password: 'Reset your password',
      wrong_pwd_in_signin: 'Wrong password, please try again',
    },
    signUpForm: {
      with_account: 'Already have an account?',
    },
    waterModal: {
      entered_data: 'Correct entered data:',
      choose_value: 'Choose a value',
      edit_entered_amount: 'Edit the entered amount <br /> of water',
      water_amount: 'Amount of water',
      record_time: 'Recording time',
      enter_water_value: 'Enter the value of the water used',
    },
    settingModal: {
      no_img: 'No image',
      upload_img: 'Upload a photo',
      gender_identity: 'Your gender identity',
      woman: 'Woman',
      man: 'Man',
      your_name: 'Your name',
      for_woman: 'For woman',
      for_man: 'For man',
      v_m_t_description:
        'V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or   another type of activity commensurate in terms of loads (in the       absence of these, you must set 0)',
      active_time: 'Active time in hours',
      weight: 'Your weight in kilograms',
      sport_time: 'The time of active participation in sports',
      recommend_water_intake: 'Your recommended water intake per day',
      how_much_will_drink: 'Write down how much water you will drink',
    },
    deleteWaterModal: {
      delete_entry: 'Delete entry',
      are_you_sure: 'Are you sure you want to delete the entry?',
    },

    trackerPage: {
      daily_norm_value: '{{dailyWaterNormInLiters}} L',
      daily_norm: 'My daily norma',
      today: 'Today',
      month_general: 'Month',
      statistics: 'Statistics',
      currentWeek: 'Current week',
      week: 'Week {{weekNumber}}',
      liters: '{{value}} L',
    },
    changePasswordPage: {
      change_pwd: 'Change your password',
      new_password: 'New password',
      enter_new_pwd: 'Enter new password',
      repeat_new_pwd: 'Repeat new password',
    },
    errors: {
      failed_change_pwd: 'Failed to change password. Try again!',
      Failed_to_send_the_email_please_try_again_later:
        'Failed to send the email, please try again later',
      try_again: 'Please, try again',
      try_again_wrong: 'Please, try again later, something went wrong',
      Email_is_in_use: 'Email is in use',
      User_not_found: 'User not found',
      no_response: 'No response',
      Session_not_found: 'Session not found',
      Session_token_expired: 'Session token expired',
      error_deleting_record: 'Error deleting record: {{error}}',
      Request_failed_with_status_code_404:
        'Request failed with status code 404',
      Water_record_not_found: 'Water record not found',
    },
    waterList: {
      cannot_record: 'You cannot record water consumption for future dates.',
      select_valid_date: 'Please select a valid date.',
      nothing_here: 'Looks like there is nothing here yet.',
      click_addWater:
        "Click 'Add Water' to log your water intake for this day.",
    },
    notFoundPage: {
      not_found: 'Page Not Found',
      sorry: "Sorry, the page you're looking for doesn't exist.",
      go_home: 'Go to Home',
    },
    months: {
      January: 'January',
      February: 'February',
      March: 'March',
      April: 'April',
      May: 'May',
      June: 'June',
      July: 'July',
      August: 'August',
      September: 'September',
      October: 'October',
      November: 'November',
      December: 'December',
    },
    tourSteps: {
      thank_you: 'Thank you for signing up!',
      track_water: 'Track your water consumption easily with us!',
      built:
        'Built with passion by a team of talented developers, just for you!',
      daily_water_goal:
        'Here is your daily water goal. Try to reach it every day!',
      current_water_intake:
        'This shows your current water intake for today or selected date',
      add_new_portion: 'Click here to add a new portion of water!',
      or_add_new_portion: 'Or click here to add a new portion of water!',

      settings: 'Click here to manage your profile and settings!',
      consumed_water: "Here you can see the amount of water you've consumed!",
      monthly_progress:
        'Track your monthly progress – each circle shows your daily intake.',
      consumption_chart: 'Click here to view your water consumption chart!',
    },
  },
};
