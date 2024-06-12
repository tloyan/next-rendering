export enum ComponentTypeEnum {
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
}
export function detectActualType() {
  return typeof window === 'undefined'
    ? ComponentTypeEnum.SERVER
    : ComponentTypeEnum.CLIENT
}
