import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Common
      welcome: 'Welcome',
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      confirm: 'Confirm',
      search: 'Search',
      submit: 'Submit',
      reset: 'Reset',

      // Auth
      login: 'Log In',
      logout: 'Logout',
      username: 'Username',
      password: 'Password',
      email: 'Email',
      otp: 'OTP Code',
      enterOtp: 'Enter OTP',
      verifyOtp: 'Verify OTP',
      signIn: 'Sign in to your account',
      staff: 'Staff',
      staffingAgency: 'Staffing agency',
      forgotPassword: 'Forgot Password',
      emailPlaceholder: 'e.g.) sample@mail.com',

      // Dashboard
      dashboard: 'Dashboard',
      staffManagement: 'Staff my page',
      table: 'Table',
      form: 'Form',
      dynamicForm: 'Dynamic Form',

      // Form
      name: 'Name',
      description: 'Description',
      date: 'Date',
      startDate: 'Start Date',
      department: 'Department',
      role: 'Role',
      status: 'Status',
      notes: 'Notes',
      required: 'This field is required',

      // Table
      showing: 'Showing',
      to: 'to',
      of: 'of',
      results: 'results',
      first: 'First',
      previous: 'Previous',
      next: 'Next',
      last: 'Last',

      // Messages
      success: 'Success!',
      error: 'Error',
      warning: 'Warning',
      info: 'Information',
      formSubmitted: 'Form submitted successfully',
      dataUpdated: 'Your changes have been saved successfully',
      deleteConfirm: 'Are you sure you want to delete this item?',
      cannotUndo: 'This action cannot be undone',
      confirmLogout: 'Confirm Logout',
      logoutMessage: 'Are you sure you want to logout?',

      // Forgot Password
      forgotPasswordInstruction: 'Enter your email address and we will send you a code to reset your password.',
      sendResetLink: 'Send Reset Code',
      backToLogin: 'Back to Login',
      emailNotFound: 'Email address not found',
      otpSentTo: 'We sent a verification code to',
      invalidOtp: 'Invalid verification code',
      otpMustBe6Digits: 'OTP must be 6 digits',
      verify: 'Verify',
      back: 'Back',
      enterNewPassword: 'Enter your new password',
      newPassword: 'New Password',
      passwordMinLength: 'Password must be at least 8 characters',
      passwordsDoNotMatch: 'Passwords do not match',
      resetPassword: 'Reset Password',
      resetPasswordError: 'Failed to reset password',
      passwordResetSuccess: 'Password reset successfully!',
      passwordResetSuccessMessage: 'You can now login with your new password.',
      invalidEmail: 'Invalid email address',
    },
  },
  ja: {
    translation: {
      // Common
      welcome: 'ようこそ',
      loading: '読み込み中...',
      save: '保存',
      cancel: 'キャンセル',
      delete: '削除',
      edit: '編集',
      close: '閉じる',
      confirm: '確認',
      search: '検索',
      submit: '送信',
      reset: 'リセット',

      // Auth
      login: 'Log In',
      logout: 'ログアウト',
      confirmLogout: 'ログアウト確認',
      logoutMessage: 'ログアウトしてもよろしいですか？',
      username: 'ユーザー名',
      password: 'Password',
      email: 'Email',
      emailAddress: 'メールアドレス',
      otp: 'OTPコード',
      enterOtp: 'OTPを入力',
      verifyOtp: 'OTP認証',
      signIn: 'アカウントにログイン',
      staff: 'Staff',
      staffingAgency: 'Staffing agency',
      forgotPassword: 'Forgot Password',
      emailPlaceholder: '例）sample@mail.com',

      // Dashboard
      dashboard: 'ダッシュボード',
      staffManagement: 'スタッフ管理',
      table: 'テーブル',
      form: 'フォーム',
      dynamicForm: '動的フォーム',

      // Form
      name: '名前',
      description: '説明',
      date: '日付',
      startDate: '開始日',
      department: '部署',
      role: '役割',
      status: 'ステータス',
      notes: '備考',
      required: 'この項目は必須です',

      // Table
      showing: '表示中',
      to: 'から',
      of: '/',
      results: '件',
      first: '最初',
      previous: '前へ',
      next: '次へ',
      last: '最後',

      // Messages
      success: '成功！',
      error: 'エラー',
      warning: '警告',
      info: '情報',
      formSubmitted: 'フォームが正常に送信されました',
      dataUpdated: '変更が正常に保存されました',
      deleteConfirm: 'この項目を削除してもよろしいですか？',
      cannotUndo: 'この操作は元に戻せません',

      // Forgot Password
      forgotPasswordInstruction: 'メールアドレスを入力してください。パスワードリセット用のコードを送信します。',
      sendResetLink: 'リセットコードを送信',
      backToLogin: 'ログインに戻る',
      emailNotFound: 'メールアドレスが見つかりません',
      otpSentTo: '確認コードを送信しました：',
      invalidOtp: '無効な確認コード',
      otpMustBe6Digits: 'OTPは6桁である必要があります',
      verify: '確認',
      back: '戻る',
      enterNewPassword: '新しいパスワードを入力してください',
      newPassword: '新しいパスワード',
      passwordMinLength: 'パスワードは8文字以上である必要があります',
      passwordsDoNotMatch: 'パスワードが一致しません',
      resetPassword: 'パスワードをリセット',
      resetPasswordError: 'パスワードのリセットに失敗しました',
      passwordResetSuccess: 'パスワードが正常にリセットされました！',
      passwordResetSuccessMessage: '新しいパスワードでログインできます。',
      invalidEmail: '無効なメールアドレス',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
