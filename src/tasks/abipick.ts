import fs from "fs";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatPluginError } from "hardhat/plugins";
import { Interface, FormatTypes } from "@ethersproject/abi";
import {
  PLUGIN_NAME,
  OUTPUT_DIR,
  TASK_ABIPICK,
  FormatMinimal,
  FormatFull,
} from "../constants";

task(TASK_ABIPICK, "Pick ABI from contracts")
  .addOptionalParam(
    "format",
    "Output abi format, support 'json' 'minimal' 'full'",
  )
  .setAction(
    async (taskArgs: { format?: string }, hre: HardhatRuntimeEnvironment) => {
      // read configs from `hardhat.config.ts`
      if (hre.config.abipick.contracts.length === 0) {
        throw new HardhatPluginError(
          PLUGIN_NAME,
          "Can't find `abipick` config in `hardhat.config.ts`",
        );
      }
      const abipickCfg = hre.config.abipick;

      // create `abipick` dir, if exists, remove it first
      const destDir = OUTPUT_DIR;
      if (fs.existsSync(destDir)) fs.rmSync(destDir, { recursive: true });
      fs.mkdirSync(destDir, { recursive: true });

      for (const c of abipickCfg.contracts) {
        const { abi } = await hre.artifacts.readArtifact(c.contract);
        // console.log(`abi of ${c.contract}:`, abi);
        console.log(`Contract: ${c.contract}`);

        // throw error when contract is **solidity library contract**
        if (abi.length === 0) {
          throw new HardhatPluginError(
            PLUGIN_NAME,
            "Can't handle solidity library contract",
          );
        }

        // pick functions+event+errors abi
        let result: any[] = [];
        for (const element of abi) {
          if (
            (element.type == "function" &&
              c.functions?.includes(element.name)) ||
            (element.type == "event" && c.events?.includes(element.name)) ||
            (element.type == "error" && c.errors?.includes(element.name))
          ) {
            result.push(element);
            console.log(`  >>> ${element.type}: ${element.name}`);
          }
        }

        // abi format
        let format = abipickCfg.format ?? FormatTypes.json;
        if ((taskArgs.format ?? "") === FormatMinimal) {
          format = FormatTypes.Minimal;
        } else if ((taskArgs.format ?? "") === FormatFull) {
          format = FormatTypes.full;
        }
        const iface = new Interface(result);

        // write to file
        fs.writeFileSync(
          `${OUTPUT_DIR}/${c.contract}.json`,
          JSON.stringify(iface.format(format), null, 2),
          {
            flag: "a+",
          },
        );
      }
    },
  );
