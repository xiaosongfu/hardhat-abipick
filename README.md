## Hardhat Plugin abipick

Pick the ABI which you need just.

#### 1. Install

```
$ npm install --save-dev hardhat-abipick
# or
$ yarn add --dev hardhat-abipick
```

#### 2. Included Commands

- `npx hardhat abipick [--format <format>]`: Pick the ABI which you need just.
  * `--format` parameter is the format of the output ABI, support 'json' 'minimal' 'full'

#### 3. Usage

Load plugin in Hardhat config:

```
require('hardhat-abipick');
# or
import 'hardhat-abipick';
```

Add optional configuration with `abipick` key:

| option                 | description                                        | optional | type         | default value |
|------------------------|----------------------------------------------------|----------|--------------|---------------|
| format                 | output abi format, support 'json' 'minimal' 'full' | true     | string       | "json"        |
| contracts              | the contracts you want to pick                     | true     | object array | "[]"          |
| contracts[i].contract  | the contract name                                  | false    | string       | "[]"          |
| contracts[i].functions | the functions you want to pick                     | true     | string array | "[]"          |
| contracts[i].events    | the events you want to pick                        | true     | string array | "[]"          |
| contracts[i].errors    | the errors you want to pick                        | true     | string array | "[]"          |

> !! `npx hardhat abipick [--format <format>]` command's `--format` parameter has higher priority than configurations `format` in `hardhat.config.ts`.

for example:

```
abipick: {
  format: "full", // "json" "minimal" "full"
  contracts: [
    {
      contract: "ScoreLend",
      functions: ["borrow"],
      events: ["Borrow", "Payback"],
      errors: ["HasOverdue"]
    }
  ],
}
```

#### 5. Version History

- v0.1.0 (2024/05/07)
  * init release
