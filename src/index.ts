import { extendConfig } from "hardhat/config";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";

// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";

// Import tasks
import "./tasks/abipick";

import { FormatJson } from "./constants";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    // read user config
    const abipick = userConfig.abipick;

    // inject config fields
    config.abipick = abipick ?? { format: FormatJson, contracts: [] };
  },
);
