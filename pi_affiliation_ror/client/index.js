import { registerPluginComponent } from "indico/utils/plugins";

import RORInput from "./forms/fields/RORInput";

const PLUGIN_NAME = "pi_affiliation_ror";

const rorField = {
  ext__ror: {
    title: "ROR Affiliation",
    inputComponent: RORInput,
    settingsModalSize: "tiny",
    noRequired: false,
    hasPrice: false,
    icon: "location", //"user", "info", "location", "search"
    renderAsFieldset: false,
  },
};

registerPluginComponent(PLUGIN_NAME, "regformCustomFields", rorField);
