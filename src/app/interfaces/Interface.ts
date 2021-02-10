export interface User {
  $key?: string;
  uid: string
  username: string;
}

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
  uid: string
}
