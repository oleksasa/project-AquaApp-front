export const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
];

export const SettingsDefaultValues = userInfo => {
  return {
    gender: userInfo.gender || 'man',
    name: userInfo.name || 'User',
    email: userInfo.email || '',
    weight: userInfo.weight || '0',
    sportTime: userInfo.sportTime || '0',
    dailyRateWater: userInfo.dailyRateWater || '1.8',
    avatar:
      userInfo.avatar ||
      'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png',
  };
};
