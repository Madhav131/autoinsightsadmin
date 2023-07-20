import {Platform} from 'react-native';

const fonts = {
  Raleway_Black: 'Raleway-Black',
  Raleway_BlackItalic: 'Raleway-BlackItalic',
  Raleway_Regular: 'Raleway-Regular',
  Raleway_Bold: 'Raleway-Bold',
  Raleway_BoldItalic: 'Raleway-BoldItalic',
  Raleway_ExtraBold: 'Raleway-ExtraBold',
  Raleway: 'Raleway - 20pt',
  Raleway_SemiBold: 'Raleway-SemiBold',
  Raleway_Medium: 'Raleway-Medium',
  segoeui_0: 'segoeui_0',
  segoeui_bold: Platform.OS === 'ios' ? 'Raleway-Regular' : 'segoeuib_0',
  Raleway_SemiBoldItalic: 'Raleway-SemiBoldItalic',
  segoeuisl_0: 'segoeuisl_0',
  segui_semibold: Platform.OS === 'ios' ? 'Raleway-Bold' : 'seguisb_0',
  // segui_semibold: 'seguisb_0',
  Poppins: 'Poppins-Medium',
};

export default fonts;
