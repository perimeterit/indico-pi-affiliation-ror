from indico.core.plugins import IndicoPlugin
from indico.core import signals

# from .fields.ror import RORField
# from pi_affiliation_ror.blueprint import blueprint
from indico.modules.events.registration.fields.base import RegistrationFormFieldBase
from indico.web.fields import get_field_definitions


class PIAffiliationROR(IndicoPlugin):
    """PI Affiliation ROR Plugin

    This plugin allows adding ROR to Indico registration forms
    """
    
    def init(self):
        super().init()

        self.inject_bundle('main.js')
        self.inject_bundle('main.css')
        self.connect(signals.core.get_fields, self._get_fields)
        self.connect(signals.core.app_created, self._check_field_definitions)

    # def get_blueprints(self):
    #     yield blueprint
        
    def _get_fields(self, sender, **kwargs):
        from .fields.ror import RORField
        
        yield RORField
        
    def _check_field_definitions(self, app, **kwargs):
        self.get_field_types()
        
    def get_field_types(self):
        """Get a dict with all registration field types."""

        defs = get_field_definitions(RegistrationFormFieldBase)
        # defs = get_field_definitions(RORField)
        return defs
    