import { registerPluginComponent } from "indico/utils/plugins";

import RORInput from "./forms/fields/RORInput";

const PLUGIN_NAME = "pi_affiliation_ror";

const rorField = {
  ext__ror: {
    title: "ROR Affiliation",
    inputComponent: RORInput,
    // settingsComponent: AccompanyingPersonsSettings,
    // settingsFormInitialData: accompanyingPersonsSettingsInitialData,
    // settingsFormInitialData: rorAffiliationSettingsInitialData,
    settingsModalSize: "tiny",
    noRequired: true,
    hasPrice: false,
    icon: "location", //"user", info, location, search
    renderAsFieldset: false,
  },
};

/**
* Register an object for an entry point.
* @param {string} plugin - the name of the plugin
* @param {string} entryPoint - the name of the entry point
* @param object - the object to register; can be whatever the entry point expects
 
* 'Field names from custom field plugins must begin with `ext__` or match an existing field name and set ' +
*        'the `unsafeOverrideField` property to true'
*/

registerPluginComponent(PLUGIN_NAME, "regformCustomFields", rorField);
