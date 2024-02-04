import { withInstall } from '@utils'
import './src/index.less'
import basicModal from './src/BasicModal.vue'

export const BasicModal = withInstall(basicModal)
export { useModalContext } from '@hooks/useModalContext'
export { useModal, useModalInner } from '@hooks/useModal'
export * from './src/typing'
