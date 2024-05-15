// If your plugin extends types from another plugin, you should import the plugin here.

// To extend one of Hardhat's types, you need to import the module where it has been defined, and redeclare it.
import "hardhat/types/config";

declare module "hardhat/types/config" {
  interface Pick {
    contract: string;
    functions?: string[];
    events?: string[];
    errors?: string[];
  }
  interface ABIpickConfig {
    format?: string;
    contracts: Pick[];
  }

  export interface HardhatUserConfig {
    abipick?: ABIpickConfig;
  }

  export interface HardhatConfig {
    abipick: ABIpickConfig;
  }
}
