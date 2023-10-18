import { post } from "@/utils/request";

export interface HardwareRebindCollectorReqQueryTypes {
  [k: string]: unknown;
  
}


export interface HardwareRebindCollectorReqTypes {
  /**
   * 设备型号
   */
  device_model?: string;
  /**
   * 设备地址 true
   */
  mac_arr?: string;
  /**
   * 设备版本
   */
  version?: string;
  /**
   * 设备所属网关ID
   * 如果设备是网关
   */
  wan_id?: string;
  [k: string]: unknown;
}

export interface HardwareRebindCollectorResTypes {
  /**
   * 信道
   */
  channel?: string;
  /**
   * 设备id
   */
  device_id?: string;
  /**
   * Lora地址
   */
  lora_addr?: string;
  /**
   * 网关信道
   */
  wan_channel?: string;
  /**
   * 网关ID
   */
  wan_id?: string;
  /**
   * 网关Lora地址
   */
  wan_lora_addr?: string;
  [k: string]: unknown;
}

/**
* 标题: 绑定采集器设备
* 描述: 绑定采集器设备
* 地址：http://117.78.7.246:3000/project/11/interface/api/155
*/
export const hardwareRebind_collector = (data?: HardwareRebindCollectorReqTypes) =>
  post<HardwareRebindCollectorResTypes>("/api/hardware/rebind_collector", data);
  