import { withInstall } from '@utils'
import './src/index.less'
import basicModal from './src/BasicModal.vue'

export const BasicModal = withInstall(basicModal)
export { useModalContext } from '@h/useModalContext'
export { useModal, useModalInner } from '@h/useModal'
export * from './src/typing'
