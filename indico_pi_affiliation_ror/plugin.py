from indico.core.plugins import IndicoPlugin
from indico.core import signals

class PIAffiliationROR(IndicoPlugin):
    """PI Affiliation ROR Plugin

    This plugin allows adding ROR Affiliation fields to Indico registration forms
    """
    
    def init(self):
        super().init()

        self.inject_bundle('main.js')
        self.inject_bundle('main.css')
        self.connect(signals.core.get_fields, self._get_fields)

    def _get_fields(self, sender, **kwargs):
        from .ror import RORField
        
        yield RORField
        