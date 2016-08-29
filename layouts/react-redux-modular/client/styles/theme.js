import * as Colors from 'material-ui/styles/colors'
import * as ColorManipulator from 'material-ui/utils/colorManipulator'
import Spacing from 'material-ui/styles/spacing'
import zIndex from 'material-ui/styles/zIndex'

export default {
    spacing    : Spacing,
    zIndex     : zIndex,
    fontFamily : 'Roboto, sans-serif',
    palette    : {
        primary1Color      : Colors.red500,
        primary2Color      : Colors.lightBlue500,
        primary3Color      : Colors.lightBlack,
        accent1Color       : Colors.orange500,
        accent2Color       : Colors.orange500,
        accent3Color       : Colors.deepOrange500,
        textColor          : Colors.grey600,
        alternateTextColor : Colors.white,
        canvasColor        : Colors.white,
        borderColor        : Colors.grey300,
        disabledColor      : ColorManipulator.fade(Colors.darkBlack, 0.4),
        pickerHeaderColor  : Colors.cyan500,
    }
}
