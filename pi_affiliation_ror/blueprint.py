from indico.core.plugins import IndicoPluginBlueprint

blueprint = IndicoPluginBlueprint('pi_ror',  __name__, url_prefix='/pi/ror')