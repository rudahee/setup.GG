

export interface Setup {
  $key?: string;
  name: string;
  processor?: string;
  motherboard?: string;
  graphic_card?: string;
  ram?: string;
  hdd?: string;
  sdd?: string
  cooler?: string;
  box?: string;
  power_supply?: string;
  keyboard?: string;
  mouse?: string;
  ssd?: string;
}


export interface User {
  uuid: string;
  email: string;
  display_name: string;
}
