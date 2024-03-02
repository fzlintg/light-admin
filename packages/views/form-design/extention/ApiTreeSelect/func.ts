import { IBaseFormAttrs } from '../../components/VFormDesign/config/formItemPropsConfig';
import {findComponentProps} from '../../components/VFormDesign/config/componentPropsConfig';
type BaseFormAttrs = Omit<IBaseFormAttrs, 'tag'>;
export default (compProp, options: BaseFormAttrs[]) => {//compProp表示当前组件属性，options表示setting的schema组合
  const props = findComponentProps(options, 'showCheckedStrategy');
  if (props) {
    if (compProp['treeCheckable'] && compProp['treeCheckable'] ==true) {
      props["hidden"]=false
    } else {
      props["hidden"]=true
    }
  }
}