import { IBaseFormAttrs } from '../../components/VFormDesign/config/formItemPropsConfig';
import {findComponentProps} from '../../components/VFormDesign/config/componentPropsConfig';
type BaseFormAttrs = Omit<IBaseFormAttrs, 'tag'>;
export default (compProp, options: BaseFormAttrs[]) => {
  const props = findComponentProps(options, 'showCheckedStrategy');
  if (props) {
    if (compProp['treeCheckable'] && compProp['treeCheckable'] ==true) {
      props["hidden"]=false
    } else {
      props["hidden"]=true
    }
  }
}