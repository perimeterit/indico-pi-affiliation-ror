import { registerPluginObject } from "indico/utils/plugins";

import RORInput from "./forms/fields/RORInput";

const PLUGIN_NAME = "pi_affiliation_ror";

const rorField = {
  name: "ext__ror",
  title: "ROR Affiliation",
  inputComponent: RORInput,
  settingsModalSize: "tiny",
  noRequired: false,
  hasPrice: false,
  icon: "location",
  renderAsFieldset: false,
};

registerPluginObject(PLUGIN_NAME, "regformCustomFields", rorField);
