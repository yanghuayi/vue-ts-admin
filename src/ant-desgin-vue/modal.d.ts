import { VNode } from 'vue';
import { AntdVueComponent } from './component';

/** AModal Layout Component */
export declare class AModal extends AntdVueComponent {
  afterClose: Function

  bodyStyle: object

  cancelText: string | VNode

  closable: boolean

  confirmLoading: boolean

  destroyOnClose: boolean

  footer: string | VNode

  getContainer: (instance: any) => HTMLElement

  mask: boolean

  maskClosable: boolean

  maskStyle: object

  okText: string | VNode

  okType: string

  style: object

  title: string | VNode

  visible: boolean

  width: string | number

  wrapClassName: string

  zIndex: number

  cancel: (e: Event) => void

  ok: (e: Event) => void
}
